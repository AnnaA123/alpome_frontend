import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './mystyle.module.css'; 
import { getSingleUnit, updateData, uploadImg } from '../util/GrowingUnitsAPI';
import { getAllData, getDayData } from '../util/supragardenAPI';
import CheckTemp from './CheckData';
import ShowImage from './ShowImage';
import CheckWatered from './CheckWatered';
import DeleteUnit from './DeleteUnit';

/* the content for Unitview.js 
NOTE: minmax values are currently hardcoded into the state, and are sent through props to StatsTemp */

 class UnitContent extends React.Component{

    fr = new FileReader();

    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            data: [],
            last_w: null,
            editingNotes: false,
            image: '',
            loading: true,
            shortLoading: true,
            minmax: {
                temp: {
                    min: '10',
                    low: '16',
                    high: '24',
                    max: '30'
                },
                tempW: {
                    min: '10',
                    low: '16',
                    high: '24',
                    max: '30'
                },
                ph: {
                    min: '3.5',
                    low: '5',
                    high: '6.5',
                    max: '8'
                },
                h: {
                    min: '50',
                    low: '70',
                    high: '90',
                    max: '110'
                },
                ec: {
                    min: '1',
                    low: '1.5',
                    high: '3.5',
                    max: '4'
                },
            }
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.topImg = this.topImg.bind(this);
        this.handleImgSubmit = this.handleImgSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.editNotes = this.editNotes.bind(this);
        this.editingNotes = this.editingNotes.bind(this);
        this.saveNotes = this.saveNotes.bind(this);
        this.showImages = this.showImages.bind(this);
    }


    //gets unit info from the alpome db and saves it to the state
    getUnit(id) {
        getSingleUnit(id).then(unit => {
            this.setState({
              unit,
              last_w: unit.last_watered,
              shortLoading: false,
            },
            );
          });
     }

     // date and time for last_watered
     getNow() {
        const timeNow = new Date();
        const dateNow = timeNow.getTime();

        return dateNow;
    }

    // sets unit.last_watered to current time, TODO: I need to find a goo place to trigger this function 
    setTheLw = () => {
        this.setState((prevState) => ({
            unit: {
                ...prevState.unit,
                last_watered: this.getNow(),
            },
        }));
        console.log('setTheLw: ' + JSON.stringify(this.state.unit));
        console.log('getttnowww: ' + this.getNow())
        return this.state.unit;
    }

    lastWatered() {
        const minutes = 1000 * 60;
        const hours = minutes * 60;
        const days = hours * 24;
        const weeks = days * 7;
        const years = days * 365;

        //test:  const lwm = this.getNow() - 1606145477788;
        const lwm = this.getNow() - this.state.unit.last_watered;
        const lwn = Math.round(lwm / days);

        return lwn;
    }

    // for updating last_watered
    handleTimeUpdate = (event) => {
        event.preventDefault();

        this.setTheLw();

        const unit = {
            "common_names": this.state.unit.common_names,
            "shared_access": this.state.unit.shared_access,
            "nickname": this.state.unit.nickname,
            "location": this.state.unit.location,
            "supragarden": this.state.unit.supragarden,
            "last_watered": this.getNow(),
            "watering_frequency": this.state.unit.watering_frequency,
            "data_source": this.state.unit.data_source,
            "owner": this.state.unit.owner,
            "images": this.state.unit.images,
            "unit_id": this.state.unit.unit_id,
            "notes": this.state.unit.notes
        }
        //const unit = {...this.state.unit};
        const unitId = this.getUnitId();

        console.log('unitId: ' + unitId);
        
        updateData(unit, 'bearer ' + localStorage.getItem('token'), unitId).then(unit => {
            if (unit.error !== undefined) {
                console.log( '(UnitContent.js) Error message: ' + unit.error)
            } else {
                console.log( 'It worked.' )
            }
        })
    }

     // get the date for getDayData()
     getToday() {
        const timeNow = new Date();
        const dateNow = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate();
        return dateNow;
    }

     //get current data for the supragarden unit from https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read
     getSupragarden() {
         // this suddenly isnt working :^)

         /* note to other devs: check the supragarden API. 
         it suddenly isn't giving daily data anymore, causing the app to crash
         
         getDayData(this.getToday()) */
         
         getAllData().then(stats => {
             if (stats[0] !== undefined) {
                this.setState({
                    data: stats[0].data,
                    loading: false,
                });
             } else {
                 console.log('something is not working');
             }
             
         });
     }
     
     // gets the units id from the url (then go to getUnit())
     getUnitId() {
        const located = window.location.href;
        const divided = located.split('/');
        const theId = divided[divided.length -1] 
        return theId;
    }
    
    // adds image to state
    handleImgSubmit = (event) => {
        event.persist();
        console.log('tried to add img' + event.target.files[0]);

        this.fr.readAsDataURL(event.target.files[0]);

        let imgData = event.target.files[0];
        /*const formData = new FormData();
        formData.append('file', imgData);*/

        console.log('event target ' + imgData);
        //TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.setState((prevState) => ({
            ...prevState,
            image: event.target.files[0]
        }));

        // URL.createObjectURL()
        console.log('here we are ' + JSON.stringify(this.state.image));
    }

    //posts image to unit at GrowingUnitsAPI.js
    handleImgSend = (event) => {
        event.preventDefault();
        console.log('here we are ' + this.state.image);
        const unitId = this.getUnitId();

        const formData = new FormData();
        formData.append('image', this.state.image);
        

        uploadImg(formData, 'bearer ' + localStorage.getItem('token'), unitId).then(image => {
            console.log('UnitContent img upload msg: ' + image);
            if (image !== undefined) {
                console.log( '(UnitContent.js) Error message: ' + image)
            } else {
                console.log( 'Image uploaded. ' + image );
                window.location.reload();
            }
        })
    }

    // photos at the bottom of the screen
    showImages = (unit) => {
        const imgArr = unit.images;
        const revImgArr = imgArr.reverse();

        // first reverse the order of the images to show the most recent one at the top

        if (unit.images[0] !== undefined) {
            return revImgArr.map(img => {
                return <div key={img.key}>
                    <ShowImage image={img} unitid={this.getUnitId()}> </ShowImage>
                </div>
            })
        }
    }


    // the image at the top of the page
    topImg = (imgList) => {
        if (imgList[0] !== undefined){
            return <div >
                <img src={imgList[imgList.length - 1].image_url} alt='No image' className={ styles.bigImg } />
                
            </div>
        } else {
            return <div className={ styles.bigImg }>
                <p className={ styles.centerText }></p>
                <form onSubmit={this.handleImgSend}>
                    <input type="file" name="plantimg" onChange={this.handleImgSubmit} />
                    <p>{'\n'}</p>
                    <button className={ styles.smallButtonStyle }>Add image</button>
                </form>
            </div>
        }
    }

    // updating and viewing the notes
    editNotes() {
        if (this.state.editingNotes) {
            return <div><form onSubmit={this.saveNotes}>
                <h3>Notes</h3>
                <textarea 
                    type="text" 
                    className={ styles.editStyle } 
                    value={this.state.unit.notes}
                    onChange={this.editingNotes}
                ></textarea>
                <button  className={ styles.smallButtonStyle }>Save</button>
            </form></div>
        } else {
            return <div>
                <h3>Notes</h3>
                <p className={ styles.smallText }>{this.state.unit.notes}</p>
                <button onClick={this.handleEdit} className={ styles.smallButtonStyle }>Edit</button>
                </div>
        }
    }

    handleEdit = (event) => {
        event.preventDefault();

        this.setState({editingNotes: !this.state.editingNotes})
    }

    editingNotes = (event) => {
        event.preventDefault();

        const val = event.target.value;

        this.setState((prevState) => ({
            unit: {
                ...prevState.unit,
                notes: val,
            },
        }));
    }

    saveNotes = (event) => {
        event.preventDefault();

        const unit = {...this.state.unit};
        const unitId = this.getUnitId();
        this.setState({editingNotes: !this.state.editingNotes});
        
        updateData(unit, 'bearer ' + localStorage.getItem('token'), unitId).then(unit => {
            console.log('msg from UnitContent: ' + JSON.stringify(unit));
            console.log(' this is the state ' + JSON.stringify(this.state.unit));
            if (unit.error !== undefined) {
                console.log( '(UnitContent.js) Error message: ' + unit.error)
            } else {
                console.log( 'It worked.' )
            }
        })
    }

     //test
     handleClick(event) {
        event.preventDefault();
/*
        this.getToday().then(today => {
            console.log('does this even work lol' + today)
        })
*/
        console.log('window.location.href ' + window.location.href);
        console.log('HERE ARE THE CURRENT PROPS ' + JSON.stringify(this.props));
        console.log('AND HERE IS THE ID ' + JSON.stringify(this.props.match.params.unitid));
        console.log('image url: ' + JSON.stringify(this.state.unit.images));
        console.log('garden info: ' + JSON.stringify(this.state.data));
        console.log('UNIT STATE: ' + JSON.stringify(this.state.unit));
        console.log('LASTAWATEREEEED: ' + this.state.last_w);
        console.log('right now: ' + this.getNow());
    }

    componentDidMount() {
        const unitId = this.getUnitId();
        
        this.getUnit(unitId)
        this.getSupragarden();
    }

    // TEST BUTTON: <button onClick={this.handleClick}>test</button>

    render () {
        if (this.state.unit.supragarden === true) {
            if(this.state.loading) {
                return <div className={ styles.loading }>
                    <div className={ styles.loadingText }>
                        <ion-icon name="sync-outline" ></ion-icon>
                        <p>Loading</p>
                    </div></div>
            } else {
                return (
                    <div className={ styles.contain }>
                        <div className={ styles.bigImg }>{this.topImg(this.state.unit.images)}</div>
                        <h1>{this.state.unit.nickname}</h1>
                        <Link to={{
                            pathname: `/unit/data/${this.state.unit.unit_id}`,
                            propperinos: { type: 'temp', minmax: this.state.minmax.temp }
                        }} unitid={this.state.unit.unit_id} type='temp'>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.temp} 
                                min={this.state.minmax.temp.min} low={this.state.minmax.temp.low} high={this.state.minmax.temp.high} max={this.state.minmax.temp.max} />
                                
                                    <div>
                                        <p>Temperature</p>
                                        <p className={ styles.smallText }>{this.state.data.temp} °C</p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/data/${this.state.unit.unit_id}`,
                            propperinos: { type: 'tempW', minmax: this.state.minmax.tempW }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.tempW} 
                                min={this.state.minmax.tempW.min} low={this.state.minmax.tempW.low} high={this.state.minmax.tempW.high} max={this.state.minmax.tempW.max} />
                                
                                    <div>
                                        <p>Water Temperature</p>
                                        <p className={ styles.smallText }>{this.state.data.tempW} °C</p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/data/${this.state.unit.unit_id}`,
                            propperinos: { type: 'ph', minmax: this.state.minmax.ph }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.ph} 
                                min={this.state.minmax.ph.min} low={this.state.minmax.ph.low} high={this.state.minmax.ph.high} max={this.state.minmax.ph.max} />
                                
                                    <div>
                                        <p>pH</p>
                                        <p className={ styles.smallText }>{this.state.data.ph} </p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/data/${this.state.unit.unit_id}`,
                            propperinos: { type: 'h', minmax: this.state.minmax.h }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.h} 
                                min={this.state.minmax.h.min} low={this.state.minmax.h.low} high={this.state.minmax.h.high} max={this.state.minmax.h.max} />
                                
                                    <div>
                                        <p>Humidity</p>
                                        <p className={ styles.smallText }>{this.state.data.h} %</p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/data/${this.state.unit.unit_id}`,
                            propperinos: { type: 'ec', minmax: this.state.minmax.ec }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.ec} 
                                min={this.state.minmax.ec.min} low={this.state.minmax.ec.low} high={this.state.minmax.ec.high} max={this.state.minmax.ec.max} />
                                
                                    <div>
                                        <p>Electronic Conductivity</p>
                                        <p className={ styles.smallText }>{this.state.data.ec} mS/cm</p>
                                    </div>
                            </div>
                        </Link>

                        <form onSubmit={this.handleImgSend} >
                            <input type="file" name="plant_img" onChange={this.handleImgSubmit} />
                            <button className={ styles.smallButtonStyle }>Add image</button>
                        </form>

                        <div className={ styles.picStyle }>
                            {this.showImages(this.state.unit)}
                        </div>
                        <DeleteUnit unitid={this.getUnitId()} />
                    </div>
                )
            }
            
        } else {
            if(this.state.shortLoading) {
                return <div className={ styles.loading }>
                    <div className={ styles.loadingText }>
                        <ion-icon name="sync-outline" ></ion-icon>
                        <p>Loading</p>
                    </div></div>
            } else {
            return (
                <div className={ styles.contain }>
                    <div >{this.topImg(this.state.unit.images)}</div>
                    <h1>{this.state.unit.nickname}</h1>
                    <div className={ styles.boxstyle3 }>
                        <CheckWatered w_freq={this.state.unit.watering_frequency} today={this.getNow()} last_watered={this.state.unit.last_watered}/>
                        <div>
                            <p className={ styles.smallText }>Your garden was last watered {this.lastWatered()} days ago. </p>
                            <button onClick={this.handleTimeUpdate} className={ styles.smallButtonStyle }>Plants watered!</button>
                            
                        </div>
                    </div>
                    <div className={ styles.boxstyle3 }>
                        
                        {this.editNotes()}
                    </div>

                    <form onSubmit={this.handleImgSend} >
                        <input type="file" name="plant_img" onChange={this.handleImgSubmit} />
                        <button className={ styles.smallButtonStyle }>Add image</button>
                    </form>

                    <div className={ styles.picStyle }>
                        {this.showImages(this.state.unit)}
                    </div>

                    <DeleteUnit unitid={this.getUnitId()} />
                    
                </div>
            )
        }}
    }
}

export default withRouter(UnitContent);