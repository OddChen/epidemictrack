import axios from 'axios';
import React from 'react';
// import Route, {Router} from 'react-router-dom';
import NewsCom from './components/newscom';
import './assets/css/style.css'; 

function  VisMap(props){
  return (
    <div className="contentItem">
      <h1>可视化地图</h1>
    </div>
  )
}
function  Onsite(props){
  return (
    <div className="contentItem">
      <h1>进展</h1>
    </div>
  )
}
function  Ty(props){
  return (
    <div className="contentItem">
      <h1>ty</h1>
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newData: null,
      navList: ['疫情地图','最新进展','太原疫情','直击现场'],
      tabIndex: 0,
      barStyle:{
        left: '22px'
      },
      contentStyle:{
        transform:'translate(0,0)'
      }
    }
  }

  async componentDidMount(){
    let result = await axios.get("http://localhost:8080/api/newsdata");
    let data = JSON.parse(result.data.forum.extra.ncov_string_list);
    console.log(data)
  }

  tabClickEvent(index){
    this.setState({
      barStyle:{
        left:(index*93.5+22)+"px"
      },
      tabIndex: index,
      contentStyle:{
        transform:`translate(-${index*375}px,0)`
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          {this.state.navList.map((item,index)=>{
            return (
              (index === this.state.tabIndex) ?
              <div 
                key={index} 
                onClick={(event)=>this.tabClickEvent(index)} 
                className="navItem active"
              >
                {item}
              </div>
              :
              <div 
                key={index} 
                onClick={(event)=>this.tabClickEvent(index)} 
                className="navItem"
              >
                {item}
              </div>
            )
          })}
          <div className="bar" style={this.state.barStyle}></div>
        </div>
        <div className="content" style={this.state.contentStyle}> 
          <VisMap></VisMap>
          <NewsCom></NewsCom>
          <Ty></Ty>
          <Onsite></Onsite>
        </div>
      </div>
    );
  }
}

export default App;
