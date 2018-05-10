// mocha did not support IE9-
var expect = chai.expect
$("#test").after("<br/><br/><div>" + navigator.userAgent + "</div>")
describe("native 'input' feature support", function () {
    it("current browser does not support", function () {
        expect($.onInputSupport).to.not.be.ok
    })
})
