describe('clinical:hl7-resources-researchStudy', function () {
  var server = meteor();
  var client = browser(server);

  it('ResearchStudy should exist on the client', function () {
    return client.execute(function () {
      expect(ResearchStudy).to.exist;
    });
  });

  it('ResearchStudy should exist on the server', function () {
    return server.execute(function () {
      expect(ResearchStudy).to.exist;
    });
  });

});
