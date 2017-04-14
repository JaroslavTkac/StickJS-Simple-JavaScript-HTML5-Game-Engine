/**
 * Created by jaroslavtkaciuk on 10/04/2017.
 */

function orbitLight(){
    pointLight.changePlace(
        (pointLight.centerX + Math.cos(pointLight.alpha) * pointLight.radius),
        0,
        (pointLight.centerZ + Math.sin(pointLight.alpha) * pointLight.radius));

    //y = (pointLight.centerY + (Math.cos(alpha) + Math.sin(alpha))*10);
    pointLight.alpha += pointLight.alphaInc;
}