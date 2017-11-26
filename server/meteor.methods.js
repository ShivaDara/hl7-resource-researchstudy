

Meteor.methods({
  createResearchStudy:function(researchStudyObject){
    check(researchStudyObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Creating ResearchStudy...');
      ResearchStudy.insert(researchStudyObject, function(error, result){
        if (error) {
          console.log(error);
          if (typeof HipaaLogger === 'object') {
            HipaaLogger.logEvent({
              eventType: "error",
              userId: Meteor.userId(),
              userName: Meteor.user().fullName(),
              collectionName: "ResearchStudy"
            });
          }
        }
        if (result) {
          console.log('ResearchStudy created: ' + result);
          if (typeof HipaaLogger === 'object') {
            HipaaLogger.logEvent({
              eventType: "create",
              userId: Meteor.userId(),
              userName: Meteor.user().fullName(),
              collectionName: "ResearchStudy"
            });
          }
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeResearchStudy:function(){
    if (ResearchStudy.find().count() === 0) {
      console.log('-----------------------------------------');
      console.log('No records found in ResearchStudy collection.  Lets create some...');

      var defaultResearchStudy = {
        'name' : [
          {
            'text' : 'Jane Doe',
            'resourceType' : 'HumanName'
          }
        ],
        'active' : true,
        'gender' : 'female',
        'identifier' : [
          {
            'use' : 'usual',
            'type' : {
              text: 'Medical record number',
              'coding' : [
                {
                  'system' : 'http://hl7.org/fhir/v2/0203',
                  'code' : 'MR'
                }
              ]
            },
            'system' : 'urn:oid:1.2.36.146.595.217.0.1',
            'value' : '123',
            'period' : {}
          }
        ],
        'birthdate' : new Date(1970, 1, 25),
        'resourceType' : 'ResearchStudy'
      };

      Meteor.call('createResearchStudy', defaultResearchStudy);
    } else {
      console.log('ResearchStudy already exist.  Skipping.');
    }
  },
  dropResearchStudy: function(){
    console.log('-----------------------------------------');
    console.log('Dropping researchStudy... ');

    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Creating ResearchStudy...');
      ResearchStudy.find().forEach(function(researchStudy){
        ResearchStudy.remove({_id: researchStudy._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
