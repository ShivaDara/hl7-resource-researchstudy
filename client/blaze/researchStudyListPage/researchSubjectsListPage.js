Session.setDefault( 'researchStudySearchFilter', '' );
Session.setDefault( 'tableLimit', 20 );
Session.setDefault( 'paginationCount', 1 );
Session.setDefault( 'selectedPagination', 0 );
Session.setDefault( 'skipCount', 0 );



//------------------------------------------------------------------------------
// ROUTING

Router.route( '/list/researchStudy/', {
  name: 'researchStudyListPage',
  template: 'researchStudyListPage',
  data: function () {
    return ResearchStudy.find();
  }
});

//------------------------------------------------------------------------------
// TEMPLATE INPUTS

Template.researchStudyListPage.events( {
  'click .addRecordIcon': function () {
    Router.go( '/insert/researchStudy' );
  },
  'click .researchStudyItem': function () {
    Router.go( '/view/researchStudy/' + this._id );
  },
  // use keyup to implement dynamic filtering
  // keyup is preferred to keypress because of end-of-line issues
  'keyup #researchStudySearchInput': function () {
    Session.set( 'researchStudySearchFilter', $( '#researchStudySearchInput' ).val() );
  }
} );


//------------------------------------------------------------------------------
// TEMPLATE OUTPUTS


var OFFSCREEN_CLASS = 'off-screen';
var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

// Template.researchStudyListPage.rendered = function () {
//   console.log( 'trying to update layout...' );
//
//   Template.appLayout.delayedLayout( 20 );
// };


Template.researchStudyListPage.helpers( {
  dateOfBirth: function(){
    return moment(this.birthDate).format("MMM DD, YYYY");
  },
  getName: function(){
    return this.name[0].text;
  },
  hasNoContent: function () {
    if ( ResearchStudy.find().count() === 0 ) {
      return true;
    } else {
      return false;
    }
  },
  researchStudyList: function () {
    Session.set( 'receivedData', new Date() );

    Template.appLayout.delayedLayout( 20 );

    return ResearchStudy.find();
    // return ResearchStudy.find( {
    //   'name.$.text': {
    //     $regex: Session.get( 'researchStudySearchFilter' ),
    //     $options: 'i'
    //   }
    // } );
  }
} );
