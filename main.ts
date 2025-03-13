function тест_датчиков () {
    StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port1)
    basic.pause(20)
    if (StartbitV2.startbit_ultrasonic() < 7) {
        for (let index8 = 0; index8 <= 4; index8++) {
            led.plot(0, index8)
        }
    } else {
        for (let index9 = 0; index9 <= 4; index9++) {
            led.unplot(0, index9)
        }
    }
    StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port2)
    basic.pause(20)
    if (StartbitV2.startbit_ultrasonic() < 7) {
        for (let index10 = 0; index10 <= 4; index10++) {
            led.plot(index10, 0)
        }
    } else {
        for (let index11 = 0; index11 <= 4; index11++) {
            led.unplot(index11, 0)
        }
    }
    питание = StartbitV2.startbit_getBatVoltage()
    if (питание >= 3.55) {
        led.plot(1, 1)
    } else {
        led.unplot(1, 1)
    }
    if (питание >= 3.6) {
        led.plot(2, 1)
    } else {
        led.unplot(2, 1)
    }
    if (питание >= 3.65) {
        led.plot(3, 1)
    } else {
        led.unplot(3, 1)
    }
    if (питание >= 3.7) {
        led.plot(4, 1)
    } else {
        led.unplot(4, 1)
    }
    if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.White)) {
        led.plot(1, 3)
        led.plot(1, 2)
    } else {
        led.unplot(1, 3)
        led.unplot(1, 2)
    }
    if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2, StartbitV2.startbit_LineColor.White)) {
        led.plot(2, 3)
        led.plot(2, 2)
    } else {
        led.unplot(2, 3)
        led.unplot(2, 2)
    }
    if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3, StartbitV2.startbit_LineColor.White)) {
        led.plot(3, 3)
        led.plot(3, 2)
    } else {
        led.unplot(3, 3)
        led.unplot(3, 2)
    }
    if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.White)) {
        led.plot(4, 3)
        led.plot(4, 2)
    } else {
        led.unplot(4, 3)
        led.unplot(4, 2)
    }
}
function по_линии (num2: number, speed: number) {
    if (num2 == 0) {
        s4 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.Black)
        s3 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3, StartbitV2.startbit_LineColor.Black)
        s2 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2, StartbitV2.startbit_LineColor.Black)
        s1 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.Black)
    } else {
        s4 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.White)
        s3 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3, StartbitV2.startbit_LineColor.White)
        s2 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2, StartbitV2.startbit_LineColor.White)
        s1 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.White)
    }
    if (!(s1) && !(s4)) {
        if (s2 && s3) {
            StartbitV2.startbit_setMotorSpeed(speed, speed)
        } else if (!(s2) && s3) {
            StartbitV2.startbit_setMotorSpeed(30, speed)
        } else if (!(s3) && s2) {
            StartbitV2.startbit_setMotorSpeed(speed, 30)
        }
    } else if (!(s1) && s4) {
        StartbitV2.startbit_setMotorSpeed(0 - speed, speed)
        basic.pause(55)
    } else if (!(s4) && s1) {
        StartbitV2.startbit_setMotorSpeed(speed, 0 - speed)
        basic.pause(55)
    }
}
function выравнивание_по_стенке (num5: number) {
    if (num5 < 20) {
        StartbitV2.startbit_setMotorSpeed(-70, -70)
        basic.pause(15 * (20 - num5))
        StartbitV2.startbit_setMotorSpeed(0, 0)
    }
}
function первый_полигон () {
    StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port1)
    while (!(StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.Black) && StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.Black))) {
        if (input.buttonIsPressed(Button.A)) {
            поехали = 0
            break;
        }
        расстояние1 = StartbitV2.startbit_ultrasonic()
        if (расстояние1 < 15) {
            StartbitV2.startbit_setMotorSpeed(0, 0)
            basic.pause(200)
            расстояние2 = StartbitV2.startbit_ultrasonic()
            if (расстояние1 - расстояние2 >= 0) {
                объезд()
            }
        } else {
            по_линии(белая, 70)
        }
    }
}
function расстояние (num3: number) {
    if (num3 == 1) {
        StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port1)
    } else {
        StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port2)
    }
    basic.pause(50)
    i = 0
    us_old = 0
    while (i < 10) {
        us = StartbitV2.startbit_ultrasonic()
        if (Math.abs(us - us_old) < 3) {
            i += 1
        } else {
            i = 0
        }
        basic.pause(50)
        us_old = us
    }
    if (us_old == 0) {
        return 50
    } else {
        return us_old
    }
}
function запомнить_короткий_маршрут () {
    temp = list2[list2.length - 1]
    if (180 == Math.abs(temp - course)) {
        list2.pop()
    } else {
        list2.push(course)
    }
}
function проехать_вперед_до_перекрестка (num: number) {
    StartbitV2.startbit_setMotorSpeed(92, 85)
    for (let index = 0; index < num; index++) {
        if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.Black) && StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.Black)) {
            Полигон_пройден = 1
            break;
        }
    }
}
function лабиринт_обратно () {
    Полигон_пройден = 0
    course = 0
    while (!(Полигон_пройден == 1)) {
        if (input.buttonIsPressed(Button.A)) {
            поехали = 0
            break;
        }
        temp = list2.pop()
        if (course == temp) {
            проехать_вперед_до_перекрестка(1240)
        } else {
            if (temp - course > 0) {
                StartbitV2.startbit_setMotorSpeed(80, -80)
                basic.pause(1250)
                проехать_вперед_до_перекрестка(1240)
                course = temp
            } else {
                if (temp - course < 0) {
                    StartbitV2.startbit_setMotorSpeed(-80, 80)
                    basic.pause(1250)
                    проехать_вперед_до_перекрестка(1240)
                    course = temp
                }
            }
        }
    }
}
function инверсия () {
    if (поехали == 1) {
        for (let index = 0; index < 15; index++) {
            while (!(StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.Black) && StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.Black))) {
                if (input.buttonIsPressed(Button.A)) {
                    поехали = 0
                    break;
                }
                по_линии(белая, 65)
            }
        }
    }
    if (поехали == 1) {
        for (let index = 0; index < 15; index++) {
            while (!(StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.White) && StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.White))) {
                if (input.buttonIsPressed(Button.A)) {
                    поехали = 0
                    break;
                }
                по_линии(черная, 65)
            }
        }
    }
}
function Старт () {
    StartbitV2.startbit_setMotorSpeed(80, 80)
    basic.pause(400)
    StartbitV2.startbit_setMotorSpeed(0, 0)
    basic.pause(500)
}
function изменить_маршрут (num4: number) {
    course = course + num4
    if (course < 0) {
        course = course + 360
    }
    if (course >= 360) {
        course = course - 360
    }
}
function лабиринт_туда () {
    Полигон_пройден = 0
    list2 = []
    list2.push(course)
    while (!(Полигон_пройден == 1)) {
        if (input.buttonIsPressed(Button.A)) {
            поехали = 0
            break;
        }
        ULs1 = расстояние(1)
        ULs2 = расстояние(2)
        выравнивание_по_стенке(ULs1)
        // ULs1<=20 и ULs2<=20
        if (ULs1 > 20 && ULs2 <= 20) {
            проехать_вперед_до_перекрестка(1240)
            запомнить_короткий_маршрут()
        } else if (ULs1 <= 20 && ULs2 <= 20) {
            StartbitV2.startbit_setMotorSpeed(-80, 80)
            basic.pause(800)
            StartbitV2.startbit_setMotorSpeed(0, 0)
            basic.pause(500)
            изменить_маршрут(-90)
        } else {
            StartbitV2.startbit_setMotorSpeed(80, -80)
            basic.pause(1250)
            проехать_вперед_до_перекрестка(1240)
            изменить_маршрут(90)
            запомнить_короткий_маршрут()
        }
        StartbitV2.startbit_setMotorSpeed(0, 0)
        basic.pause(800)
    }
}
function объезд () {
    StartbitV2.startbit_setMotorSpeed(-90, 90)
    basic.pause(550)
    StartbitV2.startbit_setMotorSpeed(80, 80)
    basic.pause(900)
    StartbitV2.startbit_setMotorSpeed(90, -90)
    basic.pause(1000)
    StartbitV2.startbit_setMotorSpeed(85, 85)
    while (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.White)) {
        StartbitV2.startbit_setMotorSpeed(85, 85)
    }
    StartbitV2.startbit_setMotorSpeed(-90, 90)
    basic.pause(500)
}
let ULs2 = 0
let ULs1 = 0
let list2: number[] = []
let temp = 0
let us = 0
let us_old = 0
let i = 0
let расстояние2 = 0
let расстояние1 = 0
let s1 = false
let s2 = false
let s3 = false
let s4 = false
let питание = 0
let Полигон_пройден = 0
let белая = 0
let черная = 0
let course = 0
let поехали = 0
let номер_полигона = 1
поехали = 0
course = 0
черная = 1
белая = 0
StartbitV2.startbit_Init()
StartbitV2.lineFollow_iic_init(StartbitV2.startbit_iic.port4)
Полигон_пройден = 0
while (!(input.buttonIsPressed(Button.A))) {
    тест_датчиков()
    basic.pause(30)
}
while (input.buttonIsPressed(Button.A)) {
	
}
basic.showNumber(номер_полигона)
while (!(input.buttonIsPressed(Button.A))) {
    if (input.buttonIsPressed(Button.B)) {
        if (номер_полигона >= 9) {
            номер_полигона = 1
        } else {
            номер_полигона += 1
        }
        basic.showNumber(номер_полигона)
    }
}
поехали = 1
let us1_lst = [
25,
25,
25,
25,
25,
15,
25,
25,
25,
15,
15,
25,
25,
15,
15,
25,
15,
25,
15,
25,
15,
25,
15,
15,
25,
25,
25,
15,
15,
15,
25,
25,
25
]
let us2_lst = [
15,
15,
25,
25,
15,
15,
15,
15,
15,
15,
15,
15,
25,
15,
15,
15,
25,
15,
25,
15,
25,
25,
15,
15,
15,
25,
15,
25,
15,
15,
15,
15,
15
]
basic.forever(function () {
    while (поехали == 1) {
        if (номер_полигона == 1) {
            basic.showNumber(номер_полигона)
            Старт()
            первый_полигон()
            if (поехали == 1) {
                номер_полигона += 1
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(600)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                basic.pause(200)
            } else {
                continue;
            }
        } else if (номер_полигона == 2) {
            basic.showNumber(номер_полигона)
            лабиринт_туда()
            if (поехали == 1) {
                номер_полигона += 1
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(500)
            } else {
                continue;
            }
        } else if (номер_полигона == 3) {
            basic.showNumber(номер_полигона)
            инверсия()
            if (поехали == 1) {
                номер_полигона += 1
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(300)
            } else {
                continue;
            }
        } else if (номер_полигона == 4) {
            basic.showNumber(номер_полигона)
            if (поехали == 1) {
                номер_полигона += 1
            } else {
                continue;
            }
        } else if (номер_полигона == 5) {
            basic.showNumber(номер_полигона)
            инверсия()
            if (поехали == 1) {
                номер_полигона += 1
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(600)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                basic.pause(100)
            } else {
                continue;
            }
        } else if (номер_полигона == 6) {
            basic.showNumber(номер_полигона)
            лабиринт_обратно()
            if (поехали == 1) {
                номер_полигона += 1
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(400)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                basic.pause(100)
            } else {
                continue;
            }
        } else if (номер_полигона == 7) {
            basic.showNumber(номер_полигона)
            первый_полигон()
        } else if (номер_полигона == 8) {
            basic.showNumber(номер_полигона)
            инверсия()
            if (поехали == 1) {
                номер_полигона = 9
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(500)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                basic.pause(100)
            } else {
                continue;
            }
        } else if (false) {
            basic.showNumber(номер_полигона)
            лабиринт_туда()
            if (поехали == 1) {
                номер_полигона = 7
                StartbitV2.startbit_setMotorSpeed(85, 85)
                basic.pause(200)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                basic.pause(100)
            } else {
                continue;
            }
        }
    }
    StartbitV2.startbit_setMotorSpeed(0, 0)
    while (input.buttonIsPressed(Button.A)) {
    	
    }
    while (!(input.buttonIsPressed(Button.A))) {
        if (input.buttonIsPressed(Button.B)) {
            if (номер_полигона >= 9) {
                номер_полигона = 1
            } else {
                номер_полигона += 1
            }
            basic.showNumber(номер_полигона)
        }
    }
    поехали = 1
})
