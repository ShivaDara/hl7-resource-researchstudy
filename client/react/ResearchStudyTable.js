import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Avatar from 'react-toolbox/lib/avatar';

import { Table } from 'react-bootstrap';
import TextField from 'material-ui/TextField';


Session.setDefault('researchStudySearchFilter', '');
Session.setDefault('selectedResearchStudyId', '');

export default class ResearchStudyTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      showSearch: false,
      researchStudy: ResearchStudy.find({'name.text': {
        $regex: Session.get('researchStudySearchFilter'),
        $options: 'i'
      }}, {limit: this.props.limit}).map(function(person){
        return {
          _id: person._id,
          active: person.active.toString(),
          gender: person.gender,
          name: person.name ? person.name[0].text : "",
          birthdate: moment(person.birthDate).format("YYYY-MM-DD"),
          photo: person.photo ? person.photo[0].url: ""
        };
      })
    };

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    if (this.props.showSearch) {
      data.showSearch = this.props.showSearch;
    }
    if (!Session.equals('selectedResearchStudyId', '')) {
      data.showSearch = false;
    } else {
      data.showSearch = true;
    }

    return data;
  }


  rowClick(id, name){
    // set the user
    //Session.set("selectedResearchStudyId", id);

    // if a selected row is clicked again, unselect it
    if (Session.equals('selectedResearchStudyId', id)) {
      Session.set("selectedResearchStudyId", '');
    } else {
      // otherwise, update the select row to whatever was just clicked
      Session.set("selectedResearchStudyId", id);
    }

    if (Session.equals('researchStudySearchFilter', name)) {
      Session.set("researchStudySearchFilter", '');
    } else {
      Session.set("researchStudySearchFilter", name);
    }

    // set which tab is selected
    let state = Session.get('researchStudyCardState');
    state["index"] = 2;
    Session.set('researchStudyCardState', state);
  }
  renderAvatar(i){
    if (!this.props.hideAvatar) {
      return (
        <td>
          <Avatar><img src={this.data.researchStudy[i].photo }/></Avatar>
        </td>
      );
    }
  }
  renderAvatarHeader(){
    if (!this.props.hideAvatar) {
      return (<th>photo</th>);
    }
  }
  renderResearchStudySearch(){
    if (this.data.showSearch) {
      return (
        <TextField
          id="researchStudySearchInput"
          floatingLabelText="Search researchStudy..."
          floatingLabelStyle={{color: 'lightgray'}}
          fullWidth={true}
          onChange={this.setSearchFilter}
        />
      );
    }
  }
  setSearchFilter(event){
    console.log("setSearchFilter", event.target.value);
    Session.set('researchStudySearchFilter', event.target.value);
  }
  render () {
    let tableRows = [];
    console.log("this.data.researchStudy.length", this.data.researchStudy.length);

    for (var i = 0; i < this.data.researchStudy.length; i++) {
      tableRows.push(
        <tr key={i} className="researchStudyRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.researchStudy[i]._id, this.data.researchStudy[i].name)} >
          {this.renderAvatar(i)}
          <td>{this.data.researchStudy[i].name }</td>
          <td>{this.data.researchStudy[i].gender}</td>
          <td>{this.data.researchStudy[i].birthdate }</td>
          <td className='hidden-on-phone'>{this.data.researchStudy[i].active}</td>
          <td className='hidden-on-phone'><span className="barcode">{this.data.researchStudy[i]._id}</span></td>
        </tr>
      );
    }


    return(
      <div>
        {this.renderResearchStudySearch() }
        <Table responses hover >
          <thead>
            <tr>
              {this.renderAvatarHeader}
              <th>name</th>
              <th>gender</th>
              <th>birthdate</th>
              <th className='hidden-on-phone'>active</th>
              <th className='hidden-on-phone'>user._id</th>
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
      </div>
    );
  }
}


ResearchStudyTable.propTypes = {};
ReactMixin(ResearchStudyTable.prototype, ReactMeteorData);
