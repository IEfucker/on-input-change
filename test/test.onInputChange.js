console.log(chai)
var expect = chai.expect
$("#test").after("<br/><br/><div>"+navigator.userAgent+"</div>")
describe("native 'input' feature support",function(){
    it("current browser does not support",function(){
        expect($.onInputSupport).to.not.be.ok
    })
})

describe("test input",function(){
    it("input fire",function(){
        $("#test").on("input",function(){
            console.log(arguments)
        })
        
        $("#test").focus().val(2).trigger("keypress",[9])
    })
})