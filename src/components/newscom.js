import React from 'react';
import axios from 'axios';

class NewsCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }

    async componentDidMount(){
        let res = await axios.get('http://localhost:8080/api/news');
        let data = JSON.parse(res.data.data[0].content);
        console.log(data);
    }

    render(){
        return(
            <div className="contentItem">test</div>
        )
    }
}

export default NewsCom;