Session.setDefault('researchStudyReadOnly', true);


Router.map(function () {
  this.route('newResearchStudyRoute', {
    path: '/insert/researchStudy',
    template: 'researchStudyUpsertPage',
    onAfterAction: function () {
      Session.set('researchStudyReadOnly', false);
    }
  });

});
Router.route('/upsert/researchStudy/:id', {
  name: 'upsertResearchStudyRoute',
  template: 'researchStudyUpsertPage',
  data: function () {
    return ResearchStudy.findOne(this.params.id);
  },
  onAfterAction: function () {
    Session.set('researchStudyReadOnly', false);
  }
});
Router.route('/view/researchStudy/:id', {
  name: 'viewResearchStudyRoute',
  template: 'researchStudyUpsertPage',
  data: function () {
    return ResearchStudy.findOne(this.params.id);
  },
  onAfterAction: function () {
    Session.set('researchStudyReadOnly', true);
  }
});


//-------------------------------------------------------------


Template.researchStudyUpsertPage.helpers({
  getName: function(){
    return this.name[0].text;
  },
  getEmailAddress: function () {
    if (this.telecom && this.telecom[0] && (this.telecom[0].system === "email")) {
      return this.telecom[0].value;
    } else {
      return "";
    }
  },
  isNewResearchStudy: function () {
    if (this._id) {
      return false;
    } else {
      return true;
    }
  },
  isReadOnly: function () {
    if (Session.get('researchStudyReadOnly')) {
      return 'readonly';
    }
  },
  getResearchStudyId: function () {
    if (this._id) {
      return this._id;
    } else {
      return '---';
    }
  }
});

Template.researchStudyUpsertPage.events({
  'click #removeUserButton': function () {
    ResearchStudy.remove(this._id, function (error, result) {
      if (error) {
        console.log("error", error);
      };
      if (result) {
        Router.go('/list/researchStudy');
      }
    });
  },
  'click #saveUserButton': function () {
    //console.log( 'this', this );

    Template.researchStudyUpsertPage.saveResearchStudy(this);
    Session.set('researchStudyReadOnly', true);
  },
  'click .barcode': function () {
    // TODO:  refactor to Session.toggle('researchStudyReadOnly')
    if (Session.equals('researchStudyReadOnly', true)) {
      Session.set('researchStudyReadOnly', false);
    } else {
      Session.set('researchStudyReadOnly', true);
      console.log('Locking the researchStudy...');
      Template.researchStudyUpsertPage.saveResearchStudy(this);
    }
  },
  'click #lockResearchStudyButton': function () {
    //console.log( 'click #lockResearchStudyButton' );

    if (Session.equals('researchStudyReadOnly', true)) {
      Session.set('researchStudyReadOnly', false);
    } else {
      Session.set('researchStudyReadOnly', true);
    }
  },
  'click #researchStudyListButton': function (event, template) {
    Router.go('/list/researchStudy');
  },
  'click .imageGridButton': function (event, template) {
    Router.go('/grid/researchStudy');
  },
  'click .tableButton': function (event, template) {
    Router.go('/table/researchStudy');
  },
  'click #previewResearchStudyButton': function () {
    Router.go('/customer/' + this._id);
  },
  'click #upsertResearchStudyButton': function () {
    console.log('creating new ResearchStudy...');
    Template.researchStudyUpsertPage.saveResearchStudy(this);
  }
});


Template.researchStudyUpsertPage.saveResearchStudy = function (researchStudy) {
  // TODO:  add validation functions

  if (researchStudy._id) {
    var researchStudyOptions = {
      researchStudyname: $('#researchStudynameInput').val(),
      emails: [{
        address: $('#researchStudyEmailInput').val()
      }],
      profile: {
        fullName: $('#researchStudyFullNameInput').val(),
        avatar: $('#researchStudyAvatarInput').val(),
        description: $('#researchStudyDescriptionInput').val()
      }
    };

    ResearchStudy.update({
      _id: researchStudy._id
    }, {
      $set: researchStudyOptions
    }, function (error, result) {
      if (error) console.log(error);
      Router.go('/view/researchStudy/' + researchStudy._id);
    });

    if (researchStudy.emails[0].address !== $('#researchStudyEmailInput')
      .val()) {
      var options = {
        researchStudyId: researchStudy._id,
        email: $('#researchStudyEmailInput')
          .val()
      };
      Meteor.call('updateEmail', options);
    }


  } else {
    var researchStudyOptions = {
      researchStudyname: $('#researchStudynameInput').val(),
      email: $('#researchStudyEmailInput').val(),
      profile: {
        fullName: $('#researchStudyFullNameInput').val(),
        avatar: $('#researchStudyAvatarInput').val(),
        description: $('#researchStudyDescriptionInput').val()
      }
    };
    //console.log( 'researchStudyOptions', researchStudyOptions );

    researchStudyOptions.password = $('#researchStudynameInput')
      .val();
    Meteor.call('addUser', researchStudyOptions, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {
        console.log('result', result);
        Router.go('/view/researchStudy/' + result);
      }
    });

  }
};
