
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//import { ResearchStudy } from 'meteor/accounts-base';


export const insertResearchStudy = new ValidatedMethod({
  name: 'researchStudy.insert',
  validate: new SimpleSchema({
    'name.$.text': { type: String },
    'identifier': { type: [ String ], optional: true },
    'gender': { type: String, optional: true },
    'active': { type: Boolean, optional: true },
    'birthdate': { type: Date, optional: true },
    'photo.$.url': { type: String, optional: true }
  }).validator(),
  run(document) {

    ResearchStudy.insert(document);
  }
});

export const updateResearchStudy = new ValidatedMethod({
  name: 'researchStudy.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    console.log("updateResearchStudy");
    console.log("_id", _id);
    console.log("update", update);

    let researchStudy = ResearchStudy.findOne({_id: _id});

    delete researchStudy._id;
    delete researchStudy._document;
    delete researchStudy._super_;
    researchStudy.name.text = update.name.text;
    researchStudy.gender = update.gender;
    researchStudy.photo = update.gender.photo;

    console.log("diffedResearchStudy", researchStudy);

    ResearchStudy.update(_id, { $set: update });
  }
});

export const removeResearchStudyById = new ValidatedMethod({
  name: 'researchStudy.removeById',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    ResearchStudy.remove({_id: _id});
  }
});
