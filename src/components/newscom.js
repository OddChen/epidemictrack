import React from 'react';
import axios from 'axios';
import bannerImg from '../assets/img/banner.png';
import '../assets/css/style.css';

class NewsCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            datalist: [],
        }
    }

    async componentDidMount(){
        let res = await axios.get('http://localhost:8080/api/news');
        let data = JSON.parse(res.data.data[0].content);
        console.log(data.sub_raw_datas)
        this.setState({
            datalist:data.sub_raw_datas
        })
    }

    render(){
        return(
            <div className="contentItem">
                <div className="banner">
                    <img alt="banner" src={bannerImg}/>
                </div>
                <h1>疫情追踪</h1>
                <div className="newContent">
                    <div className="line"></div>
                    <div className="newList">
                        {
                            this.state.datalist.map((item,index)=>{
                                if(item.event_image){
                                    return (
                                        <div className="newsListItem" key={index}>
                                            <div className="time">{item.raw_data.showtime_string}</div>
                                            <div className="desc">{item.raw_data.desc}</div>
                                            <div className="img">
                                                <img alt="img" src={item.raw_data.event_image.url}/>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className="newsListItem" key={index}>
                                            <div className="time">{item.raw_data.showtime_string}</div>
                                            <div className="desc">{item.raw_data.desc}</div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsCom;