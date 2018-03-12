function userCode() {
    if ( playFrames && fpsSum % 30 === 0 ) {
        applyChangesToSpecificType("cone",null,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    }if ( playFrames && fpsSum % 60 === 0 ) {
        applyChangesToSpecificType("cone",null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    }if ( playFrames && fpsSum === 20 ) {
        applyChangesToSpecificType("cube",0,2,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    }
}