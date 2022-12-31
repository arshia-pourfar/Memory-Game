let container = document.querySelector(".container");
let startGamePage = document.querySelector(".start-game");
// level select for number of item 
let levelSelect;
// for creat random list for select item and start game
let numberIdArray = [];
// all conditions for winner in this game and remove item
let victoryConditions = [{ id1: 0, id2: 1 }, { id1: 2, id2: 3 }, { id1: 4, id2: 5 }, { id1: 6, id2: 7 }, { id1: 8, id2: 9 }, { id1: 10, id2: 11 }, { id1: 12, id2: 13 }, { id1: 14, id2: 15 }, { id1: 16, id2: 17 }, { id1: 18, id2: 19 }, { id1: 20, id2: 21 }, { id1: 22, id2: 23 }, { id1: 24, id2: 25 }, { id1: 26, id2: 27 },
{ id1: 1, id2: 0 }, { id1: 3, id2: 2 }, { id1: 5, id2: 4 }, { id1: 7, id2: 6 }, { id1: 9, id2: 8 }, { id1: 11, id2: 10 }, { id1: 13, id2: 12 }, { id1: 15, id2: 14 }, { id1: 17, id2: 16 }, { id1: 19, id2: 18 }, { id1: 21, id2: 20 }, { id1: 23, id2: 22 }, { id1: 25, id2: 24 }, { id1: 27, id2: 26 }];
// check full load main page
$(document).ready(function () {
    // choose easy level
    $(".esay").click(function () {
        levelSelect = 6;
        // select size game border by level select
        container.style.width = "610px";
        container.style.height = "480px";
    });
    // choose medium level
    $(".medium").click(function () {
        levelSelect = 8;
        // select size game border by level select
        container.style.width = "620px";
        container.style.height = "670px";
    });
    // choose hard level
    $(".hard").click(function () {
        levelSelect = 14;
        // select size game border by level select
        container.style.width = "1080px";
        container.style.height = "670px";
    });
    // click on level game and start
    $(".start-game button").click(function () {
        // show border game by flex display
        container.style.display = "flex";
        // hidden welcom border by none display
        startGamePage.style.display = "none";
        // for loop for repeat and creat random item list
        for (var x = 0; x < levelSelect * 2; x++) {
            // Generating random number
            selectRandomId();
            function selectRandomId() {
                var randomNumber = Math
                    .floor(Math.random() * levelSelect * 2) + 0;
                // Pushing into the array only 
                // if the array does not contain it
                if (!numberIdArray.includes(randomNumber)) {
                    numberIdArray.push(randomNumber);
                } else {
                    // else the array does not contain it
                    selectRandomId();
                }
            }
            // add item to border game by random list created
            container.innerHTML += `
                <div class="item item-`+ items[numberIdArray[x]].id + `" onclick="showItem(` + items[numberIdArray[x]].id + `)">
                    <i  class="`+ items[numberIdArray[x]].imageSrc + `"></i>
                </div>`;
        }
    });

});

// how much click item one or two
let i = 1;
// id1 => first item click and id2 => second item click
let id1, id2;
// onclick items and show image //// id => id item click 
function showItem(id) {
    // if first item does not click
    if (i < 2) {
        id1 = id;
        // bgc first item clicked = transparent
        $(".item-" + id1 + "").css("background-color", "transparent");
        i++;
    }
    // if first item click and second item does not click
    else if (i == 2) {
        id2 = id;
        // bgc second item clicked = transparent
        $(".item-" + id2 + "").css("background-color", "transparent");
        // sound checkWinner function
        checkWinner(id1, id2);
    }
}
// checkWinner function to check id1 and id2 which has an image or not
function checkWinner(id1, id2) {
    // for loop for check all victory conditions
    for (let v = 0; v < victoryConditions.length; v++) {
        // if id1 and id2 have a one image
        if (id1 == victoryConditions[v].id1 && id2 == victoryConditions[v].id2) {
            // for hidden items
            let inteval = setInterval(timerHiddenItems, 500);
            function timerHiddenItems() {
                // first item and second item clicked remove
                $(".item-" + id1 + "").css("opacity", "0");
                $(".item-" + id2 + "").css("opacity", "0");
                clearInterval(inteval);
            }
            // reset round item clicked
            i = 1;
            continue;
        }
        // if id1 and id2 have not a one image
        if (id1 != victoryConditions[v].id1 || id2 != victoryConditions[v].id2) {
            // after 1 second reset bgc items
            let inteval = setInterval(timerResetElse, 1000);
            function timerResetElse() {
                // first item and second item clicked reset
                $(".item-" + id1 + "").css("background-color", "#03bb13");
                $(".item-" + id2 + "").css("background-color", "#03bb13");
                clearInterval(inteval);
            }
            // reset round item clicked
            i = 1;
            continue;
        }
        break;
    }
    // repeat all actions
}