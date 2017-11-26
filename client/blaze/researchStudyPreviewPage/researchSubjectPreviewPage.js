
Router.map(function(){
  this.route('researchStudyPreviewPage', {
    path: '/researchStudy/:id',
    template: 'researchStudyPreviewPage',
    data: function () {
      return ResearchStudy.findOne({_id: this.params.id});
    }
  });
});


Template.researchStudyPreviewPage.events({
  "click .listButton": function(event, template){
    Router.go('/list/researchStudy');
  },
  "click .imageGridButton": function(event, template){
    Router.go('/grid/researchStudy');
  },
  "click .tableButton": function(event, template){
    Router.go('/table/researchStudy');
  },
  "click .indexButton": function(event, template){
    Router.go('/list/researchStudy');
  },
  "click .researchStudyId": function(){
    Router.go('/upsert/researchStudy/' + this._id);
  }
});
