if(Package['clinical:autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  Your app has the 'clinical-autopublish' package installed.");
  console.log("Any protected health information (PHI) stored in this app should be audited."); 
  console.log("Please consider writing secure publish/subscribe functions and uninstalling.");  
  console.log("");  
  console.log("meteor remove clinical:autopublish");  
  console.log("");  
}
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");  
  console.log("meteor remove autopublish");  
  console.log("meteor add clinical:autopublish");  
  console.log("");  
}







/**
 * @summary Represents a ResearchStudy; typically documented by a clinician.  A Clinical Impression can be self-assigned, in which case it may be considered a Status or ReportedCondition.
 * @class ResearchStudy
 * @param {Object} document An object representing an impression, ususally a Mongo document.
 * @example
newResearchStudy = new ResearchStudy({
  name: {
    given: "Jane",
    family: "Doe"
  },
  gender: "female",
  identifier: "12345"
});


newResearchStudy.clean();
newResearchStudy.validate();
newResearchStudy.save();
 */


// create the object using our BaseModel
ResearchStudy = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
ResearchStudy.prototype._collection = ResearchStudy;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.ResearchStudy = new Mongo.Collection('HL7.Resources.ResearchStudy');
ResearchStudy = new Mongo.Collection('ResearchStudy');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ResearchStudy._transform = function (document) {
  return new ResearchStudy(document);
};




ResearchStudySchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
  "resourceType" : {
    type: String,
    defaultValue: "ResearchStudy"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
    },
  "active" : {
    type: Boolean,
    optional: true,
    defaultValue: true
    },
  "name" : {
    optional: true,
    type: [ HumanNameSchema ]
    },
  "telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
    },
  "gender" : {
    optional: true,
    allowedValues: ['male', 'female', 'other', 'unknown'],
    type: String
    },
  "birthDate" : {
    optional: true,
    type: Date
    },
  "deceasedBoolean" : {
    optional: true,
    type: Boolean
    },
  "deceasedDateTime" : {
    optional: true,
    type: Date
    },
  "address" : {
    optional: true,
    type: [ AddressSchema ]
    },
  "maritalStatus" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "multipleBirthBoolean" : {
    optional: true,
    type: Boolean
    },
  "multipleBirthInteger" : {
    optional: true,
    type: Number
    },
  "photo" : {
    optional: true,
    type: [ AttachmentSchema ]
    },
  "contact.$.relationship" : {
    optional: true,
    type: [ CodeableConceptSchema ]
    },
  "contact.$.name" : {
    optional: true,
    type: HumanNameSchema
    },
  "contact.$.telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
    },
  "contact.$.address" : {
    optional: true,
    type: [ AddressSchema ]
    },
  "contact.$.gender" : {
    optional: true,
    allowedValues: ['male', 'female', 'other', 'unknown'],
    type: Code
    },
  "contact.$.organization" : {
    optional: true,
    type: String
    },
  "contact.$.period" : {
    optional: true,
    type: PeriodSchema
    },
  "animal.species" : {
    optional: true,
    type: String
    //type: CodeableConceptSchema
    },
  "animal.breed" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "animal.genderStatus" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "communication.$.language" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "communication.$.preferred" : {
    optional: true,
    type: Boolean
    },
  "generalPractitioner" : {
    optional: true,
    type: [ ReferenceSchema ]
    },
  "managingOrganization" : {
    optional: true,
    type: ReferenceSchema
    },
  "link.$.other" : {
    optional: true,
    type: ReferenceSchema
    },
  "link.$.type" : {
    optional: true,
    allowedValues: ['replaced-by', 'replaces', 'refer', 'seealso'],
    type: Code
    },
  "test" : {
    optional: true,
    type: Boolean
    }
  }
]);
ResearchStudy.attachSchema(ResearchStudySchema);


ResearchStudy.prototype.toFhir = function(){
  console.log('ResearchStudy.toFhir()');



  return EJSON.stringify(this.name);
}

/**
 * @summary Search the ResearchStudy collection for a specific Meteor.userId().
 * @memberOf ResearchStudy
 * @name findUserId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.findUserId(Meteor.userId());
 *  let researchStudy = researchStudy[0];
 * ```
 */

ResearchStudy.findUserId = function (userId) {
  process.env.TRACE && console.log("ResearchStudy.findUserId()");
  return ResearchStudy.find({'identifier.value': userId});
};

/**
 * @summary Search the ResearchStudy collection for a specific Meteor.userId().
 * @memberOf ResearchStudy
 * @name findOneUserId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.findOneUserId(Meteor.userId());
 * ```
 */

ResearchStudy.findOneUserId = function (userId) {
  process.env.TRACE && console.log("ResearchStudy.findOneUserId()");  
  return ResearchStudy.findOne({'identifier.value': userId});
};
/**
 * @summary Search the ResearchStudy collection for a specific Meteor.userId().
 * @memberOf ResearchStudy
 * @name findMrn
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.findMrn('12345').fetch();
 * ```
 */

ResearchStudy.findMrn = function (userId) {
  process.env.TRACE && console.log("ResearchStudy.findMrn()");  
  return ResearchStudy.find({'identifier.value': userId});
};

/**
 * @summary Search the ResearchStudy collection for a specific Meteor.userId().
 * @memberOf ResearchStudy
 * @name findMrn
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.findMrn('12345').fetch();
 * ```
 */

ResearchStudy.fetchBundle = function (query, parameters, callback) {
  process.env.TRACE && console.log("ResearchStudy.fetchBundle()");  
  var researchStudyArray = ResearchStudy.find(query, parameters, callback).map(function(researchStudy){
    researchStudy.id = researchStudy._id;
    delete researchStudy._document;
    return researchStudy;
  });

  // console.log("researchStudyArray", researchStudyArray);

  var result = Bundle.generate(researchStudyArray);

  // console.log("result", result.entry[0]);

  return result;
};


/**
 * @summary This function takes a FHIR resource and prepares it for storage in Mongo.
 * @memberOf ResearchStudy
 * @name toMongo
 * @version 1.6.0
 * @returns { ResearchStudy }
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.toMongo('12345').fetch();
 * ```
 */

ResearchStudy.toMongo = function (originalResearchStudy) {
  var mongoRecord;
  process.env.TRACE && console.log("ResearchStudy.toMongo()");  

  if (originalResearchStudy.identifier) {
    originalResearchStudy.identifier.forEach(function(identifier){
      if (identifier.period) {
        if (identifier.period.start) {
          var startArray = identifier.period.start.split('-');
          identifier.period.start = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
        if (identifier.period.end) {
          var endArray = identifier.period.end.split('-');
          identifier.period.end = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
      }
    });
  }

  return originalResearchStudy;
};



/**
 * @summary This function takes a DTSU2 resource and returns it as STU3.  i.e. it converts from v1.0.2 to v3.0.0
 * @name toMongo
 * @version 3.0.0
 * @returns { ResearchStudy }
 * @example
 * ```js
 * ```
 */
ResearchStudy.toStu3 = function(researchStudyJson){
  if(researchStudyJson){

    // quick cast from string to boolean
    if(typeof researchStudyJson.birthDate === "string"){
      researchStudyJson.birthDate = new Date(researchStudyJson.birthDate);
    }

    // quick cast from string to boolean
    if(researchStudyJson.deceasedBoolean){
      researchStudyJson.deceasedBoolean = (researchStudyJson.deceasedBoolean == "true") ? true : false;
    }

    // STU3 only has a single entry for family name; not an array
    if(researchStudyJson.name && researchStudyJson.name[0] && researchStudyJson.name[0].family && researchStudyJson.name[0].family[0] ){
      researchStudyJson.name[0].family = researchStudyJson.name[0].family[0];      
    }

    // make sure the full name is filled out
    if(researchStudyJson.name && researchStudyJson.name[0] && researchStudyJson.name[0].family && !researchStudyJson.name[0].text ){
      researchStudyJson.name[0].text = researchStudyJson.name[0].given[0] + ' ' + researchStudyJson.name[0].family;      
    }
  }
  return researchStudyJson;
}


/**
 * @summary Similar to toMongo(), this function prepares a FHIR record for storage in the Mongo database.  The difference being, that this assumes there is already an existing record.
 * @memberOf ResearchStudy
 * @name prepForUpdate
 * @version 1.6.0
 * @returns { Object }
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.findMrn('12345').fetch();
 * ```
 */

ResearchStudy.prepForUpdate = function (researchStudy) {
  process.env.TRACE && console.log("ResearchStudy.prepForUpdate()");  

  if (researchStudy.name && researchStudy.name[0]) {
    //console.log("researchStudy.name", researchStudy.name);

    researchStudy.name.forEach(function(name){
      name.resourceType = "HumanName";
    });
  }

  if (researchStudy.telecom && researchStudy.telecom[0]) {
    //console.log("researchStudy.telecom", researchStudy.telecom);
    researchStudy.telecom.forEach(function(telecom){
      telecom.resourceType = "ContactPoint";
    });
  }

  if (researchStudy.address && researchStudy.address[0]) {
    //console.log("researchStudy.address", researchStudy.address);
    researchStudy.address.forEach(function(address){
      address.resourceType = "Address";
    });
  }

  if (researchStudy.contact && researchStudy.contact[0]) {
    //console.log("researchStudy.contact", researchStudy.contact);

    researchStudy.contact.forEach(function(contact){
      if (contact.name) {
        contact.name.resourceType = "HumanName";
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          telecom.resourceType = "ContactPoint";
        });
      }

    });
  }

  return researchStudy;
};


/**
 * @summary Scrubbing the researchStudy; make sure it conforms to v1.6.0
 * @memberOf ResearchStudy
 * @name scrub
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchStudy = ResearchStudy.findMrn('12345').fetch();
 * ```
 */

ResearchStudy.prepForFhirTransfer = function (researchStudy) {
  process.env.TRACE && console.log("ResearchStudy.prepForFhirTransfer()");  


  // FHIR has complicated and unusual rules about dates in order
  // to support situations where a family member might report on a researchStudy's
  // date of birth, but not know the year of birth; and the other way around
  if (researchStudy.birthDate) {
    researchStudy.birthDate = moment(researchStudy.birthDate).format("YYYY-MM-DD");
  }


  if (researchStudy.name && researchStudy.name[0]) {
    //console.log("researchStudy.name", researchStudy.name);

    researchStudy.name.forEach(function(name){
      delete name.resourceType;
    });
  }

  if (researchStudy.telecom && researchStudy.telecom[0]) {
    //console.log("researchStudy.telecom", researchStudy.telecom);
    researchStudy.telecom.forEach(function(telecom){
      delete telecom.resourceType;
    });
  }

  if (researchStudy.address && researchStudy.address[0]) {
    //console.log("researchStudy.address", researchStudy.address);
    researchStudy.address.forEach(function(address){
      delete address.resourceType;
    });
  }

  if (researchStudy.contact && researchStudy.contact[0]) {
    //console.log("researchStudy.contact", researchStudy.contact);

    researchStudy.contact.forEach(function(contact){

      console.log("contact", contact);


      if (contact.name && contact.name.resourceType) {
        //console.log("researchStudy.contact.name", contact.name);
        delete contact.name.resourceType;
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          delete telecom.resourceType;
        });
      }

    });
  }

  //console.log("ResearchStudy.prepForBundle()", researchStudy);

  return researchStudy;
};

/**
 * @summary The displayed name of the researchStudy.
 * @memberOf ResearchStudy
 * @name displayName
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

ResearchStudy.prototype.displayName = function () {
  process.env.TRACE && console.log("ResearchStudy.displayName()");  

  if (this.name && this.name[0]) {
    return this.name[0].text;
  }
};


/**
 * @summary The displayed Meteor.userId() of the researchStudy.
 * @memberOf ResearchStudy
 * @name userId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

ResearchStudy.prototype.userId = function () {
  process.env.TRACE && console.log("ResearchStudy.userId()");  

  var result = null;
  if (this.extension) {
    this.extension.forEach(function(extension){
      if (extension.url === "Meteor.userId()") {
        result = extension.valueString;
      }
    });
  }
  return result;
};



/**
 * @summary The displayed Meteor.userId() of the researchStudy.
 * @memberOf ResearchStudy
 * @name userId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */


/**
 * @summary Anonymize the researchStudy record
 * @memberOf ResearchStudy
 * @name removeProtectedInfo
 * @version 1.2.3
 * @returns {Object}
 * @example
 * ```js
 * ```
 */

ResearchStudy.prototype.removeProtectedInfo = function (options) {
  process.env.TRACE && console.log("ResearchStudy.anonymize()", this);  

  console.log("ResearchStudy.anonymize()");  

  // 1. Names
  if(this.name && this.name[0]){
    var anonymizedName = this.name[0];

    if(this.name[0].family){
      anonymizedName.family = '';
    }
    if(this.name[0].given && this.name[0].given[0]){
      anonymizedName.given = [];          
    }
    if(this.name[0].text){
      anonymizedName.text = '';
    }

    this.name = [];
    this.name.push(anonymizedName);
  }

  // 3.  dates


  // 4. Phone numbers
  // 5.  Fax Numbers
  // 6.  Identifiers
  // 7.  Medical Record Nubers
  // 17.  Photos

  return this;
}


/**
 * @summary Anonymize the researchStudy record
 * @memberOf ResearchStudy
 * @name anonymize
 * @version 1.2.3
 * @returns {Object}
 * @example
 * ```js
 * ```
 */

ResearchStudy.prototype.anonymize = function () {
  process.env.TRACE && console.log("ResearchStudy.hash()", this);  

  console.log("ResearchStudy.hash()");  


  if(this.name && this.name[0]){
    var anonymizedName = this.name[0];

    if(this.name[0].family){
      anonymizedName.family = Anon.name(this.name[0].family);        
    }
    if(this.name[0].given && this.name[0].given[0]){
      var secretGiven = Anon.name(this.name[0].given[0]);
      anonymizedName.given = [];      
      anonymizedName.given.push(secretGiven);
    }
    if(this.name[0].text){
      anonymizedName.text = Anon.name(this.name[0].text);
    }

    this.name = [];
    this.name.push(anonymizedName);
  }

  return this;
}


Anon = {
  name: function(name){
    var anonName = '';
    for(var i = 0; i < name.length; i++){
      if(name[i] === " "){
        anonName = anonName + " ";
      } else {
        anonName = anonName + "*";
      }
    }
    return anonName;
  },
  phone: function(){
    return "NNN-NNN-NNNN";
  },
  ssn: function(){
    return "###-##-####"
  }
}