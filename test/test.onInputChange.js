console.log(chai)
var expect = chai.expect
$("#test").after("<br/><br/><div>" + navigator.userAgent + "</div>")
describe("native 'input' feature support", function () {
    it("current browser does not support", function () {
        expect($.onInputSupport).to.not.be.ok
    })
})

describe("test input", function () {
    it("input fire", function () {
        var input = document.createElement('input'),
            support,
            e = document.createEvent("KeyboardEvent")
        e.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, "e".charCodeAt(0))
        document.body.appendChild(input)
        input.addEventListener("input", function (e) { support = "C"; e.preventDefault(); e.stopPropagation(); }, false)
        input.focus()
        input.dispatchEvent(e)
        document.body.removeChild(input)

        expect(support).to.be.ok
    })
})