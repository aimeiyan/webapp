require(["lib/module_a", "lib/common"], function (module_a, common) {
    console.log('this is home', module_a.add(1, 2));

    common.util1();
});