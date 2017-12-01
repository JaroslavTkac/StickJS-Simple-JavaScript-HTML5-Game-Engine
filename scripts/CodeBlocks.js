/**
 * Created by jaroslavtkaciuk on 28/11/2017.
 */




/**
 * Selecting svg element function. Used to init selectedElement by svg <g> element.
 * @param evt
 */
function selectElement(evt) {
    //On element click preparing clean array for selected element children
    childMatrix = [];
    //Taking svg <g> element
    selectedElement = evt.target.parentNode;

    //Tracking mouse coordinates
    currentX = evt.clientX;
    currentY = evt.clientY;
    //Preventing from error caused by clicking on non <g> element
    if(selectedElement.tagName === "g") {
        currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');
    }
    if(selectedElement.tagName === "FORM" || selectedElement.tagName === "foreignObject")
        return;

    //Push selected element to back
    //Remove
    $(selectedElement).remove();
    //Append to html document
    $(selectedElement).appendTo("#code-logic-scene");
    //Update
    selectedElement = $("#code-logic-scene").children().last()[0];

    //Reordering child in html document
    reorderChildrenInDocument(selectedElement);

    //Saving children translate matrix in case of grouped elements conjunction
    let childrenData = getChildrenData(selectedElement);
    if(childrenData.length > 0 && childrenData[0] !== "") {
        for(i = 0; i < childrenData.length; i++) {
            var childM = getGelementByName(childrenData[i]).getAttributeNS(null, "transform").slice(7, -1).split(' ');
            childMatrix.push({
                childmktime: getChildrenData(selectedElement)[i],
                childM: childM,
                childMatrixStartX: parseFloat(childM[4]),
                childMatrixStartY: parseFloat(childM[5])
            });
        }
    }

    //Creating array of values from svg element transform translate attribute
    for(let i = 0; i < currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
    //Saving starting x and y coordinates for selected element, on case if element would be dragged over unjoinable element
    tmpMatrixX = currentMatrix[4];
    tmpMatrixY = currentMatrix[5];

    //Setting event listeners (attributes) to svg <g> element
    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseleave", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
}
/**
 * Function calling every time element is moved.
 * Changing svg <g> element position in scene and triggers functions to find intersections.
 * @param evt
 */
function moveElement(evt) {
    let dx = evt.clientX - currentX;
    let dy = evt.clientY - currentY;
    currentMatrix[4] += dx;
    currentMatrix[5] += dy;

    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");

    currentX = evt.clientX;
    currentY = evt.clientY;

    //updating intersection array
    intersectArrUpdate(selectedElement);
    //finding intersection
    findIntersection(selectedElement);

    //transform translate children of selected element
    for(let i = 0; i < childMatrix.length; i++) {
        let tmpMatrix = childMatrix[i].childM;
        let child = getGelementByName(childMatrix[i].childmktime);

        for (let j = 0; j < tmpMatrix.length; j++) {
            tmpMatrix[j] = parseFloat(tmpMatrix[j]);
        }
        tmpMatrix[4] += dx;
        tmpMatrix[5] += dy;
        child.setAttributeNS(null, "transform", "matrix(" + tmpMatrix.join(' ') + ")");

        //updating intersection array
        intersectArrUpdate(child);
    }
}
/**
 * Big function - a lot of responsibilities
 * @param evt
 */
function deselectElement(evt) {
    if(selectedElement !== 0){
        selectedElement.removeAttributeNS(null, "onmousemove");
        selectedElement.removeAttributeNS(null, "onmouseleave");
        selectedElement.removeAttributeNS(null, "onmouseup");
        let childData;

        let svgArr = document.getElementById("code-logic-scene").children;
        for(let i = 0; i < svgArr.length; i++) {
            //Killing existing father of child and giving new father
            //Going through all svg <g> elements
            //and deleting SELECTED element NAME from every element child section
            if ((svgArr[i].getElementsByClassName("myChild")[0].textContent.indexOf(getmktime(selectedElement)) !== -1) &&
                (tmpMatrixX !== currentMatrix[4] || tmpMatrixY !== currentMatrix[5])) {
                console.log("Going to clean father's ** " + getmktime(svgArr[i]) + " ** children");
                console.log(i);
                childData = getChildrenData(svgArr[i]);
                let cleanData = "";
                for (let j = 0; j < childData.length; j++) {
                    if (childData[j] !== getmktime(selectedElement)) {
                        if (j > 0)
                            cleanData += ",";
                        cleanData += childData[j];
                    }
                    else
                        break;
                }
                console.log("child data: " + childData);
                console.log("cleaned child data: " + cleanData);
                svgArr[i].getElementsByClassName("myChild")[0].innerHTML = cleanData;
                //svgArr[i].getElementsByClassName("myFather")[0].innerHTML = "none";
                //console.log("My father: " + svgArr[i].getElementsByClassName("myFather")[0].textContent);
            }
        }
        for(let i = 0; i < svgArr.length; i++){
            //Found intersection
            if((svgArr[i].firstElementChild.getAttribute("stroke") === "green") &&
                svgArr[i].firstElementChild.getAttribute("stroke-dasharray") === "0") {

                //Main father -> element that was with green border
                let fathersName = getmktime(svgArr[i]);
                //Main father -> svg <g> element
                let father = svgArr[i];

                //Check if father is already have kids if so -> prevent from joining
                if(getChildrenData(father).length > 0 && getChildrenData(father)[0] !== ""){
                    moveSelectedElementBack();
                    break;
                }

                //Setting father value
                //selectedElement.getElementsByClassName("myFather")[0].innerHTML = fathersName;

                //Joining element to another by y axis
                while (father.firstElementChild.getAttribute("stroke") === "green"){
                    currentMatrix[5] += 1;
                    tmpTotalDy += 1;
                    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");

                    //updating intersection array
                    intersectArrUpdate(selectedElement);
                    //finding intersection
                    findIntersection(selectedElement);
                }
                //Aligning element by x axis
                while(getElementXf(father) !== getElementXf(selectedElement)){
                    if(getElementXf(father) <= getElementXf(selectedElement)) {
                        currentMatrix[4] -= 1;
                        tmpTotalDx -= 1;
                    }
                    if(getElementXf(father) >= getElementXf(selectedElement)) {
                        currentMatrix[4] += 1;
                        tmpTotalDx += 1;
                    }
                    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");

                    //updating intersection array
                    intersectArrUpdate(selectedElement);
                    //finding intersection
                    findIntersection(selectedElement);
                }

                //Say that selected element is child
                childData = father.getElementsByClassName("myChild")[0].textContent;
                if(childData.indexOf(getmktime(selectedElement)) === -1)
                    father.getElementsByClassName("myChild")[0].innerHTML = getmktime(selectedElement);
                if(childData.indexOf(getmktime(selectedElement)) === -1 && childData.length > 0)
                    father.getElementsByClassName("myChild")[0].innerHTML = childData + "," + getmktime(selectedElement);

                childData = getChildrenData(selectedElement);

                //Checking is SELECTED element have any children
                if(childData.length > 0 && childData[0] !== ""){
                    for(let j = 0; j < childData.length; j++) {
                        if (getChildrenData(father).indexOf(childData[j]) === -1 && childData.length > 0)
                            getGelementByName(fathersName).getElementsByClassName("myChild")[0].innerHTML =
                                getChildrenData(father) + "," + childData[j];
                    }

                    //paimti visus vaikus prijungiamo objekto
                    childData = getChildrenData(selectedElement);
                    for(let j = 0; j < childData.length; j++){
                        var childM = getGelementByName(childData[j]).getAttributeNS(null, "transform").slice(7, -1).split(' ');
                        for(k = 0; k < childM.length; k++) {
                            childM[k] = parseFloat(childM[k]);
                        }
                        childM[4] += tmpTotalDx;
                        childM[5] += tmpTotalDy;

                        getGelementByName(childData[j]).setAttributeNS(null, "transform", "matrix(" + childM.join(' ') + ")");

                        //updating intersection array
                        intersectArrUpdate(getGelementByName(childData[j]));
                    }
                }

                //Adding SELECTED element child name to main father of the element group
                for (let l = 0; l < svgArr.length; l++){
                    childData = getChildrenData(svgArr[l]);
                    for(let j = 0; j < childData.length; j++){
                        if(childData[j] === fathersName){
                            childData = svgArr[l].getElementsByClassName("myChild")[0].textContent;

                            if(childData.indexOf(getmktime(selectedElement)) === -1 && childData.length > 0) {
                                console.log("Adding selected");
                                svgArr[l].getElementsByClassName("myChild")[0].innerHTML = childData + "," + getmktime(selectedElement);

                                let selectedElemChildData = getChildrenData(selectedElement);
                                if(selectedElemChildData.length > 0 && selectedElemChildData[0] !== "") {
                                    for (let k = 0; k < selectedElemChildData.length; k++) {
                                        console.log(selectedElemChildData[k]);
                                        childData = svgArr[l].getElementsByClassName("myChild")[0].textContent;
                                        svgArr[l].getElementsByClassName("myChild")[0].innerHTML = childData + "," + selectedElemChildData[k];

                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }

            //If element can not be joined
            if((svgArr[i].firstElementChild.getAttribute("stroke") === "green") &&
                svgArr[i].firstElementChild.getAttribute("stroke-dasharray") !== "0")
                moveSelectedElementBack();

            //Deleting element
            if((svgArr[i].firstElementChild.getAttribute("stroke") === "red") &&
                svgArr[i].firstElementChild.getAttribute("stroke-dasharray") === "0") {
                console.log("Going to delete");
                deleteSvgElement(selectedElement);
            }
        }
    }
    selectedElement = 0;
    tmpTotalDx = 0;
    tmpTotalDy = 0;

    //saving all written code to server
    saveSvgCodeScene();
}
/**
 * Reverting changes with selected element moving
 * Pushing element back to start point
 */
function moveSelectedElementBack() {
    currentMatrix[4] = tmpMatrixX;
    currentMatrix[5] = tmpMatrixY;
    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
    //updating intersection array
    intersectArrUpdate(selectedElement);
    //finding intersection
    findIntersection(selectedElement);

    for (let i = 0; i < childMatrix.length; i++) {
        let tmpMatrix = childMatrix[i].childM;
        let child = getGelementByName(childMatrix[i].childmktime);

        for (let k = 0; k < tmpMatrix.length; k++) {
            tmpMatrix[k] = parseFloat(tmpMatrix[k]);
        }
        tmpMatrix[4] = childMatrix[i].childMatrixStartX;
        tmpMatrix[5] = childMatrix[i].childMatrixStartY;
        child.setAttributeNS(null, "transform", "matrix(" + tmpMatrix.join(' ') + ")");

        //updating intersection array
        intersectArrUpdate(child);
    }
}
/**
 * Adding new element to scene by click
 */
function addSvgElementToScene() {
    $('#code-logic-selector').on('mousedown', 'g', function() {
        let hoverElement = $(this).children()[0];
        if(hoverElement !== undefined && hoverElement.tagName === "path") {
            hoverElement.setAttribute("opacity", "0.5");
            hoverElement.setAttribute("stroke", "red");
            hoverElement.setAttribute("stroke-width", "3.5");
        }
    }).on('mouseup', 'g', function() {
        let hoverElement = $(this).children()[0];
        if (hoverElement !== undefined && hoverElement.tagName === "path") {
            hoverElement.setAttribute("opacity", "1");
            hoverElement.setAttribute("stroke", "black");
            hoverElement.setAttribute("stroke-width", "2");
        }
        let svgToAdd = $(this)[0].outerHTML;

        //Edit transform translation
        let tmp = "";
        for(let i = 0; i < svgToAdd.length; i++){
            if(svgToAdd[i] !== ")")
                tmp += svgToAdd[i];
            else
                break;
        }
        tmp += ")\"";

        //getting correct x and y coordinates
        let doc = document.getElementById('code-scene-div');
        //x & y is to get center of the code logic scene
        let x = doc.scrollLeft + Math.round(doc.offsetWidth/2), y = doc.scrollTop + Math.round(doc.offsetHeight/2);
        console.log("X: " + x + " Y: " + y);
        let modSvgToAdd = svgToAdd.replace(tmp.substr(3, tmp.length), "transform=\"matrix(1 0 0 1 " + x + " " + y + ")\"");

        //Save already filled data to array and fill back it after appending html
        let svgArr = document.getElementById("code-logic-scene").children;
        let dataArr = [];

        //Saving already created data
        for(let i = 0; i < svgArr.length; i++){
            if(getmktime(svgArr[i]) !== "trashbin")
                dataArr.push({
                    "name" : getmktime(svgArr[i]),
                    "value" : getDataFromSvgForm(svgArr[i])
                })
        }
        //console.log(dataArr);


        //Add to main scene
        $("#code-logic-scene").append(modSvgToAdd).html($("#code-logic-scene").html());
        svgArr = document.getElementById("code-logic-scene").children;
        let element = svgArr[svgArr.length-1];
        let baseClass = element.className.baseVal;

        element.setAttribute("class", baseClass + " joinable draggable");
        element.setAttributeNS(null, "onmousedown", "selectElement(evt)");
        element.getElementsByClassName("mktime")[0].innerHTML = mktime();
        //if have selection field prepare values for selecting
        //console.log(getmktime(element));
        if(getSvgCodeId(element) === "for specific"){
            console.log("for specific");
            let select = element.getElementsByClassName("select-specific-svg")[0];
            $(select).find('option').remove().end();

            let items = [{
                    value: "cube",
                    text: "Cube"
                }, {
                    value: "sphere",
                    text: "Sphere"
                }, {
                    value: "simpleSphere",
                    text: "S.Sphere"
                }, {
                    value: "cone",
                    text: "Cone"
                }, {
                    value: "cylinder",
                    text: "Cylinder"
                }];
            for (let i = 0; i < userUploadedShapesNamesArray.length; i++){
                items.push({value: userUploadedShapesNamesArray[i], text: userUploadedShapesNamesArray[i]})
            }

            for(let i = 0; i < items.length; i++)
                $(select).append(new Option(items[i].text, items[i].value));

        }
        if(getSvgCodeId(element) === "for name"){
            console.log("for name");
            let select = element.getElementsByClassName("select-name-svg")[0];
            $(select).find('option').remove().end();

            let items = [];

            for(let i = 0; i < objArr.length; i++){
                let name = objArr[i].name;
                if(objArr[i].name.length >= 10)
                    name = objArr[i].name.substr(0, 9) + "...";

                items.push({value: objArr[i].name, text: name});
            }

            for(let i = 0; i < items.length; i++)
                $(select).append(new Option(items[i].text, items[i].value));

        }


        intersectArrInit();
        //Restoring data
        svgArr = document.getElementById("code-logic-scene").children;
        for(let i = 0; i < svgArr.length; i++){
            if(getmktime(svgArr[i]) !== "trashbin")
                for(let j = 0; j < dataArr.length; j++){
                    if(getmktime(svgArr[i]) === dataArr[j].name){
                        if(svgArr[i].getElementsByClassName("code-selection").length > 0)
                            setSelectedValue(svgArr[i].getElementsByClassName("code-selection")[0], dataArr[j].value);
                        if(svgArr[i].getElementsByClassName("code-input").length > 0)
                            svgArr[i].getElementsByClassName("code-input")[0].value = dataArr[j].value;

                    }
                }
        }

        //saving all written code to server
        saveSvgCodeScene();

    });

}
function updateAllForNameBlocks() {
    let svgArr = document.getElementById("code-logic-scene").children;

    for (let j = 0; j < svgArr.length; j++) {
        let select = svgArr[j].getElementsByClassName("select-name-svg")[0];
        if(select !== undefined) {
            $(select).find('option').remove().end();
            let items = [];

            for (let i = 0; i < objArr.length; i++) {
                let name = objArr[i].name;
                if (objArr[i].name.length >= 10)
                    name = objArr[i].name.substr(0, 9) + "...";

                items.push({value: objArr[i].name, text: name});
            }
            for (let i = 0; i < items.length; i++)
                $(select).append(new Option(items[i].text, items[i].value));
        }
    }
}
function updateAllForSpecificBlocks() {
    let svgArr = document.getElementById("code-logic-scene").children;

    for (let j = 0; j < svgArr.length; j++) {
        let select = svgArr[j].getElementsByClassName("select-specific-svg")[0];
        $(select).find('option').remove().end();

        let items = [{
            value: "cube",
            text: "Cube"
        }, {
            value: "sphere",
            text: "Sphere"
        }, {
            value: "simpleSphere",
            text: "S.Sphere"
        }, {
            value: "cone",
            text: "Cone"
        }, {
            value: "cylinder",
            text: "Cylinder"
        }];
        console.log(userUploadedShapesNamesArray);
        for (let i = 0; i < userUploadedShapesNamesArray.length; i++){
            items.push({value: userUploadedShapesNamesArray[i], text: userUploadedShapesNamesArray[i]})
        }

        for(let i = 0; i < items.length; i++)
            $(select).append(new Option(items[i].text, items[i].value));
    }
}
/**
 * Setting selectable value
 */
function setSelectedValue(selectObj, valueToSet) {
    for (let i = 0; i < selectObj.options.length; i++) {
        //console.log(selectObj.options[i].text.toUpperCase() + "  ===   " + valueToSet.toUpperCase());
        if (selectObj.options[i].text.toUpperCase() === valueToSet.toUpperCase()) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}
/**
 * On group hover draw border for every element in group
 */
function previewGroupSelection() {
    $('#code-logic-scene').on('mouseenter', 'g', function() {
        let hoverElement = $(this).children()[0];
        if(hoverElement !== undefined && hoverElement.tagName === "path") {
            hoverElement.setAttribute("stroke", "blue");
            hoverElement.setAttribute("stroke-width", "3.5");

            let childData = getChildrenData(hoverElement.parentNode);
            if(childData.length > 0 && childData[0] !== "") {
                for (let i = 0; i < childData.length; i++) {
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke", "blue");
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke-width", "3.5");
                }
            }
        }
    }).on('mouseleave', 'g', function() {
        let hoverElement = $(this).children()[0];
        if(hoverElement !== undefined && hoverElement.tagName === "path") {
            hoverElement.setAttribute("stroke", "black");
            hoverElement.setAttribute("stroke-width", "2");

            let childData = getChildrenData(hoverElement.parentNode);
            if(childData.length > 0 && childData[0] !== "") {
                for (let i = 0; i < childData.length; i++) {
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke", "black");
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke-width", "2");
                }
            }
        }
    }).on('mousedown', 'g', function() {
        let hoverElement = $(this).children()[0];
        if(hoverElement !== undefined && hoverElement.tagName === "path") {

            let childData = getChildrenData(hoverElement.parentNode);
            if(childData.length > 0 && childData[0] !== "") {
                for (let i = 0; i < childData.length; i++) {
                    getGelementByName(childData[i]).firstElementChild.setAttribute("opacity", "0.5");
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke", "blue");
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke-width", "3.5");
                }
            }
        }
    }).on('mouseup', 'g', function() {
        let hoverElement = $(this).children()[0];
        if (hoverElement !== undefined && hoverElement.tagName === "path") {

            let childData = getChildrenData(hoverElement.parentNode);
            if(childData.length > 0 && childData[0] !== "") {
                for (let i = 0; i < childData.length; i++) {
                    getGelementByName(childData[i]).firstElementChild.setAttribute("opacity", "1");
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke", "black");
                    getGelementByName(childData[i]).firstElementChild.setAttribute("stroke-width", "2");
                }
            }

        }
    });
}
/**
 * Reorders children in html document to prevent overlapping
 * @param element - svg <g>
 */
function reorderChildrenInDocument(element) {
    let childData = getChildrenData(element);
    let tmp;
    if(childData.length > 0 && childData[0] !== "") {
        for (let i = 0; i < childData.length; i++) {
            //Push selected element to back
            tmp = getGelementByName(childData[i]);
            //Remove
            $(tmp).remove();
            //Append to html document
            $(tmp).appendTo("#code-logic-scene");
        }
    }
}
/**
 * Get selected element all children names.
 * @param element Svg <g> component(element)
 * @returns {Array} String array of given element children names (mktime)
 */
function getChildrenData(element) {
    let children = element.getElementsByClassName("myChild");
    //[0] index, cause getElementsByClassName return an array of found "myChild" classes
    return children[0].textContent.split(",");
}
/**
 * Creating array of SORTED data by (x;y) of all <g> svg elements in scene
 * initializing - svgScene[]
 */
function getDataOfSvgInScene() {
    let svgArr = document.getElementById("code-logic-scene").children;
    let svgScene = [];
    let childData;
    codeArray = [];
    //Creating array of just svg elements data
    for(let i = 0; i < svgArr.length; i++){
        if(getmktime(svgArr[i]) !== "trashbin") {
            //Pushing into array only father elements and elements with father
            childData = getChildrenData(svgArr[i]);
            //Check NR.:1
            if (childData.length > 0 && childData[0] !== "" && childData !== undefined)
                svgScene.push({
                    mktime: getmktime(svgArr[i]),
                    codeID: getSvgCodeId(svgArr[i]),
                    value: getDataFromSvgForm(svgArr[i]),
                    children: getChildrenData(svgArr[i]),
                    x: getElementXf(svgArr[i]),
                    y: getElementYf(svgArr[i]),
                    trigger: svgArr[i].classList.contains('trigger')
                });
            //Check NR.:2
            else {
                let tmp = checkIsElementHaveFather(svgArr[i]);
                if (tmp !== 0)
                    svgScene.push({
                        mktime: getmktime(svgArr[i]),
                        codeID: getSvgCodeId(svgArr[i]),
                        value: getDataFromSvgForm(svgArr[i]),
                        children: getChildrenData(svgArr[i]),
                        x: getElementXf(svgArr[i]),
                        y: getElementYf(svgArr[i]),
                        trigger: svgArr[i].classList.contains('trigger')
                    });
            }
        }
    }
    //sorting array by x and y coordinates example (100; 40) > (120; 10)
    svgScene.sort(
        function(a, b) {
            return (parseFloat(a.y) - parseFloat(b.y)) && (parseFloat(a.x) - parseFloat(b.x));
        }
    );
    //console.log("SVG scene sorted");
    //console.log(svgScene);
    let cleanSvgScene = [];

    for (let i = 0; i < svgScene.length; i++){
        if(svgScene[i].trigger){
            cleanSvgScene.push(svgScene[i]);
            for(let k = i+1; k < svgScene.length; k++){
                if(svgScene[k].children.length > 0 && svgScene[k].children[0] !== "")
                    cleanSvgScene.push(svgScene[k]);
                else{
                    cleanSvgScene.push(svgScene[k]);
                    i = k;
                    break;
                }
            }
        }
    }
    //console.log("SVG scene cleaned");
    //console.log(cleanSvgScene);
    let groupArr = [];
    for (let i = 0; i < cleanSvgScene.length; i++){
        if(cleanSvgScene[i].children.length > 0 && cleanSvgScene[i].children[0] !== ""){
            groupArr.push(cleanSvgScene[i]);
        }
        else{
            groupArr.push(cleanSvgScene[i]);
            codeArray.push(groupArr);
            groupArr = [];
        }
    }

    console.log("Final code array");
    console.log(codeArray);
}
/**
 * Check is element is someone child
 * @param element - svg <g>
 */
function checkIsElementHaveFather(element){
    let svgArr = document.getElementById("code-logic-scene").children;
    let childData;
    for(let i = 0; i < svgArr.length; i++){
        if(getmktime(svgArr[i]) !== "trashbin") {
            childData = getChildrenData(svgArr[i]);
            if (childData.length > 0 && childData[0] !== "" && childData !== undefined) {
                for (let j = 0; j < childData.length; j++) {
                    if (getmktime(element) === childData[j])
                        return element;
                }
            }
        }
    }
    return 0;
}
/**
 * Deleting element from svg scene
 * @param element - svg <g>
 */
function deleteSvgElement(element){
    //If element have children delete them also
    let childData = getChildrenData(element);

    //Deleting selected element
    $(element).remove();

    if(childData.length > 0 && childData[0] !== "")
        for(let i = 0; i < childData.length; i++)
            $(getGelementByName(childData[i])).remove();

    intersectArrInit();

    //saving all written code to server
    saveSvgCodeScene();

    for(let i = 0; i < svgIntersectArr.length; i++)
        if(svgIntersectArr[i].trashbin)
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("transform", "scale(1.0)");
}
/**
 * Getting data from <input> or <select> tag from svg element
 *  @param element - svg <g> element
 */
function getDataFromSvgForm(element) {
    let data, e;
    if(element.getElementsByClassName("code-selection").length > 0) {
        e = element.getElementsByClassName("code-selection")[0];
        data = e.options[e.selectedIndex].value;
    }
    if(element.getElementsByClassName("code-input").length > 0) {
        e = element.getElementsByClassName("code-input")[0];
        data = e.value;
    }
    return data;
}
/**
 * Get data from svg <text> tag with class code id
 *  @param element - svg <g> element
 */
function getSvgCodeId(element) {
    return element.getElementsByClassName("code-id")[0].textContent;
}
/**
 * Intersected array initialization, load all exiting svg elements data into array
 */
function intersectArrInit(){
    svgIntersectArr = [];
    let svgArr = document.getElementById("code-logic-scene").children;
    for(let i = 0; i < svgArr.length; i++){
        svgIntersectArr.push({
            mktime: getmktime(svgArr[i]),
            xf: getSvgElementX(svgArr[i]),
            xt: Math.round(svgArr[i].getBBox().width + getSvgElementX(svgArr[i])),
            yf: getSvgElementY(svgArr[i]),
            yt: Math.round(svgArr[i].getBBox().height + getSvgElementY(svgArr[i])),
            joinable: svgArr[i].classList.contains('joinable'),
            nonjoinable: svgArr[i].classList.contains('nonjoinable'),
            trashbin: svgArr[i].classList.contains('trash-bin'),
            trigger: svgArr[i].classList.contains('trigger')
        });
    }
    console.log(svgIntersectArr);


}
/**
 * Updating intersection array with selected svg element
 *  @param element - svg <g> element
 */
function intersectArrUpdate(element) {
    for(let i = 0; i < svgIntersectArr.length; i++){
        if(svgIntersectArr[i].mktime === getmktime(element)){
            svgIntersectArr[i].xf = getElementXf(element);
            svgIntersectArr[i].xt = getElementXt(element);
            svgIntersectArr[i].yf = getElementYf(element);
            svgIntersectArr[i].yt = getElementYt(element);
            return;
        }
    }
}
/**
 * Finding intersection
 *  @param element - svg <g> element
 */
function findIntersection(element) {
    //taking top border center point coordinations
    let elementX = Math.round(getElementXf(element) + ((getElementXt(element) - getElementXf(element)) / 2));
    let elementY = getElementYf(element);

    //clear un-intersected svg elements
    for(let i = 0; i < svgIntersectArr.length; i++) {
        getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke", "black");
        getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-width", "2");
        getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "0");
        if(svgIntersectArr[i].trashbin)
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("transform", "scale(1.0)");
    }
    //Checking or taken center dot is in any svg <g> elements
    for(let i = 0; i < svgIntersectArr.length; i++){
        if(svgIntersectArr[i].mktime !== getmktime(element)){
            for(let x = svgIntersectArr[i].xf; x < svgIntersectArr[i].xt; ++x){
                for(let y = svgIntersectArr[i].yf; y < svgIntersectArr[i].yt; ++y){
                    if(x === elementX && y === elementY){
                        previewIntersection(i, element);
                        return;
                    }
                }
            }
        }
    }
}
/**
 * Drawing border for intersected element
 *  @param elementIndex - is int, index that represent element in intersection array
 * intersection array is save all svg elements array, but just only with name and coordinates data
 */
function previewIntersection(elementIndex) {
    for(let i = 0; i < svgIntersectArr.length; i++){
        if(i === elementIndex){
            //Drawing standart green border to preview intersection
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke", "green");
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-width", "4");

            //If element which is now intersected can not be joined draw dashed border
            let hasClass = selectedElement.classList.contains('joinable');
            if(!(hasClass && svgIntersectArr[i].joinable))
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "5,5,5");

            hasClass = selectedElement.classList.contains('nonjoinable');
            if(!(hasClass === svgIntersectArr[i].nonjoinable))
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "5,5,5");

            //If intersected element is rubbish bin show that
            if(svgIntersectArr[i].trashbin) {
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "0");
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke", "red");
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("transform", "scale(1.3)");
            }

            //If father and intersected element is trigger
            hasClass = selectedElement.classList.contains('trigger');
            if(hasClass && svgIntersectArr[i].trigger)
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "5,5,5");

            //If selected element = trigger & intersected = standard
            hasClass = selectedElement.classList.contains('trigger');
            if(hasClass && svgIntersectArr[i].joinable && !svgIntersectArr[i].trigger)
                getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "5,5,5");
        }
        else {
            //Other elements in array that are not intersected is displayed with standard black border
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke", "black");
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-width", "2");
            getGelementByName(svgIntersectArr[i].mktime).firstElementChild.setAttribute("stroke-dasharray", "0");
        }
    }
}
/**
 * Timestamps svg elements in scene
 */
function timeStampAll() {
    let svgArr = document.getElementById("code-logic-scene").children;
    for(let i = 0; i < svgArr.length; i++){
        if(getmktime(svgArr[i]) !== "trashbin")
            svgArr[i].getElementsByClassName("mktime")[0].innerHTML = mktime(); //patestuoti galima su [+ i]
        //svgArr[i].getElementsByClassName("mktime")[0].innerHTML = i;
    }
}
/**
 * Simply generates unique id -> timestamp
 */
function mktime(){
    let d = new Date();
    return d.getTime();
}
/**
 * Get svg <g> element from name(mktime)
 * @param value - mktime
 * @returns {Element} <g> svg element
 */
function getGelementByName(value) {
    let svg = document.getElementById("code-logic-scene");
    let elements = svg.getElementsByClassName("mktime");
    for(let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === value) {
            return elements[i].parentNode;
        }
    }
}
/**
 * Get svg <g> element id === name === mktime
 * @param element - svg <g> element
 * @returns {string} value of svg <g> element
 */
function getmktime(element) {
    return element.getElementsByClassName("mktime")[0].textContent;
}
/**
 * Get (x from) coordinates of svg <g> element  -> smallest possible x coordinate
 * @param element
 * @returns {number} x coordinates
 */
function getElementXf(element) {
    return getSvgElementX(element);
}
/**
 * Get (x to) coordinates of svg <g> element -> largest possible x coordinate
 * @param element
 * @returns {number} x coordinates
 */
function getElementXt(element) {
    return Math.round(element.getBBox().width + getSvgElementX(element))
}
/**
 * Get (y from) coordinates of svg <g> element -> smallest possible y coordinate
 * @param element
 * @returns {number} y coordinates
 */
function getElementYf(element) {
    return getSvgElementY(element);
}
/**
 * Get (y to) coordinates of svg <g> element -> largest possible y coordinate
 * @param element
 * @returns {number} y coordinates
 */
function getElementYt(element){
    return Math.round(element.getBBox().height + getSvgElementY(element));
}
/**
 * Simple function to get svg <g> element real x coordinates
 * @param element - svg <g>
 * @returns {number} X coordinate
 */
function getSvgElementX(element){
    if(element.tagName === "g") {
        let matrix = element.getAttributeNS(null, "transform").slice(7, -1).split(' ');
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = parseFloat(matrix[i]);
        }
        return Math.round(element.getBBox().x + matrix[4]);
    }
}
/**
 * Simple function to get svg <g> element real y coordinates
 * @param element - svg <g>
 * @returns {number} Y coordinate
 */
function getSvgElementY(element){
    if(element.tagName === "g") {
        let matrix = element.getAttributeNS(null, "transform").slice(7, -1).split(' ');
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = parseFloat(matrix[i]);
        }
        return Math.round(element.getBBox().y + matrix[5]);
    }
}