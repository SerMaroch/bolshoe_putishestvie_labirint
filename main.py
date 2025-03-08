def тест_датчиков():
    StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.PORT1)
    basic.pause(20)
    if StartbitV2.startbit_ultrasonic() < 7:
        for index8 in range(5):
            led.plot(0, index8)
    else:
        for index9 in range(5):
            led.unplot(0, index9)
    StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.PORT2)
    basic.pause(20)
    if StartbitV2.startbit_ultrasonic() < 7:
        for index10 in range(5):
            led.plot(index10, 0)
    else:
        for index11 in range(5):
            led.unplot(index11, 0)
    if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
        StartbitV2.startbit_LineColor.WHITE):
        led.plot(1, 3)
        led.plot(1, 2)
    else:
        led.unplot(1, 3)
        led.unplot(1, 2)
    if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2,
        StartbitV2.startbit_LineColor.WHITE):
        led.plot(2, 3)
        led.plot(2, 2)
    else:
        led.unplot(2, 3)
        led.unplot(2, 2)
    if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3,
        StartbitV2.startbit_LineColor.WHITE):
        led.plot(3, 3)
        led.plot(3, 2)
    else:
        led.unplot(3, 3)
        led.unplot(3, 2)
    if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
        StartbitV2.startbit_LineColor.WHITE):
        led.plot(4, 3)
        led.plot(4, 2)
    else:
        led.unplot(4, 3)
        led.unplot(4, 2)
def по_линии(num2: number, speed: number):
    global s4, s3, s2, s1
    if num2 == 0:
        s4 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.BLACK)
        s3 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3,
            StartbitV2.startbit_LineColor.BLACK)
        s2 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2,
            StartbitV2.startbit_LineColor.BLACK)
        s1 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.BLACK)
    else:
        s4 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.WHITE)
        s3 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3,
            StartbitV2.startbit_LineColor.WHITE)
        s2 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2,
            StartbitV2.startbit_LineColor.WHITE)
        s1 = StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.WHITE)
    if not (s1) and not (s4):
        if s2 and s3:
            StartbitV2.startbit_setMotorSpeed(speed, speed)
        elif not (s2) and s3:
            StartbitV2.startbit_setMotorSpeed(30, speed)
        elif not (s3) and s2:
            StartbitV2.startbit_setMotorSpeed(speed, 30)
    elif not (s1) and s4:
        StartbitV2.startbit_setMotorSpeed(78, 78)
        basic.pause(55)
    elif not (s4) and s1:
        StartbitV2.startbit_setMotorSpeed(78, -78)
        basic.pause(55)
def выравнивание_по_стенке(num5: number):
    if num5 < 20:
        StartbitV2.startbit_setMotorSpeed(-70, -70)
        basic.pause(15 * (20 - num5))
        StartbitV2.startbit_setMotorSpeed(0, 0)

def on_button_pressed_a():
    global поехали
    if поехали == 1:
        StartbitV2.startbit_setMotorSpeed(0, 0)
        поехали = 0
    else:
        поехали = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def первый_полигон():
    global расстояние1, расстояние2
    StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.PORT1)
    while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
        StartbitV2.startbit_LineColor.BLACK) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
        StartbitV2.startbit_LineColor.BLACK)):
        расстояние1 = StartbitV2.startbit_ultrasonic()
        if расстояние1 < 15:
            StartbitV2.startbit_setMotorSpeed(0, 0)
            basic.pause(200)
            расстояние2 = StartbitV2.startbit_ultrasonic()
            if расстояние1 - расстояние2 >= 0:
                объезд()
        else:
            по_линии(белая, 65)
def расстояние(num3: number):
    global i, us_old, us
    if num3 == 1:
        StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.PORT1)
    else:
        StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.PORT2)
    basic.pause(50)
    i = 0
    us_old = 0
    while i < 10:
        us = StartbitV2.startbit_ultrasonic()
        if abs(us - us_old) < 3:
            i += 1
        else:
            i = 0
        basic.pause(50)
        us_old = us
    if us_old == 0:
        return 50
    else:
        return us_old
def запомнить_короткий_маршрут():
    global temp
    temp = list2[len(list2) - 1]
    if 180 == abs(temp - мой_курс):
        list2.pop()
    else:
        list2.append(мой_курс)
def проехать_вперед_до_перекрестка(num: number):
    global Полигон_пройден
    StartbitV2.startbit_setMotorSpeed(92, 85)
    for index in range(num):
        if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.BLACK) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.BLACK):
            Полигон_пройден = 1
            break
def выравнивание_по_компасу():
    pass
def лабиринт_обратно():
    global Полигон_пройден, мой_курс
    Полигон_пройден = 0
    while not (Полигон_пройден == 1):
        #мой_курс = list2.pop()
        # мой_курс = list2.pop()
        # мой_курс = list2.pop()
        изменить_маршрут(-180)
        выравнивание_по_компасу()
        проехать_вперед_до_перекрестка(1240)
def инверсия():
    for index2 in range(15):
        while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.BLACK) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.BLACK)):
            по_линии(белая, 65)
    for index3 in range(15):
        while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.WHITE) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.WHITE)):
            по_линии(черная, 65)
    for index4 in range(15):
        while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.BLACK) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.BLACK)):
            по_линии(белая, 65)
    for index5 in range(15):
        while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.WHITE) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.WHITE)):
            по_линии(черная, 65)
    for index6 in range(15):
        while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.BLACK) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.BLACK)):
            по_линии(белая, 65)
    for index7 in range(15):
        while not (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
            StartbitV2.startbit_LineColor.WHITE) and StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
            StartbitV2.startbit_LineColor.WHITE)):
            по_линии(черная, 65)

def on_button_pressed_b():
    global номер_полигона
    if номер_полигона >= 7:
        номер_полигона = 1
    else:
        номер_полигона += 1
        basic.show_number(номер_полигона)
input.on_button_pressed(Button.B, on_button_pressed_b)

def Старт():
    StartbitV2.startbit_setMotorSpeed(80, 80)
    basic.pause(400)
    StartbitV2.startbit_setMotorSpeed(0, 0)
    basic.pause(500)
def изменить_маршрут(num4: number):
    global мой_курс
    мой_курс = мой_курс + num4
    if мой_курс < 0:
        мой_курс = мой_курс + 360
    if мой_курс > 360:
        мой_курс = мой_курс - 360
def лабиринт_туда():
    global Полигон_пройден, list2, ULs1, ULs2
    Полигон_пройден = 0
    list2 = []
    list2.append(мой_курс)
    while not (Полигон_пройден == 1):
        ULs1 = расстояние(1)
        ULs2 = расстояние(2)
        выравнивание_по_стенке(ULs1)
    # ULs1<=20 и ULs2<=20
    if ULs1 > 20 and ULs2 <= 20:
        проехать_вперед_до_перекрестка(1240)
        запомнить_короткий_маршрут()
    elif ULs1 <= 20 and ULs2 <= 20:
        StartbitV2.startbit_setMotorSpeed(-80, 80)
        basic.pause(800)
        StartbitV2.startbit_setMotorSpeed(0, 0)
        basic.pause(500)
        изменить_маршрут(-90)
    else:
        StartbitV2.startbit_setMotorSpeed(80, -80)
        basic.pause(1250)
        проехать_вперед_до_перекрестка(1240)
        изменить_маршрут(90)
        запомнить_короткий_маршрут()
    StartbitV2.startbit_setMotorSpeed(0, 0)
    basic.pause(800)
def объезд():
    StartbitV2.startbit_setMotorSpeed(-90, 90)
    basic.pause(550)
    StartbitV2.startbit_setMotorSpeed(80, 80)
    basic.pause(900)
    StartbitV2.startbit_setMotorSpeed(90, -90)
    basic.pause(1000)
    StartbitV2.startbit_setMotorSpeed(85, 85)
    while StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
        StartbitV2.startbit_LineColor.WHITE):
        StartbitV2.startbit_setMotorSpeed(85, 85)
    StartbitV2.startbit_setMotorSpeed(-90, 90)
    basic.pause(500)
ULs2 = 0
ULs1 = 0
list2: List[number] = []
temp = 0
us = 0
us_old = 0
i = 0
расстояние2 = 0
расстояние1 = 0
s1 = False
s2 = False
s3 = False
s4 = False
Полигон_пройден = 0
белая = 0
черная = 0
мой_курс = 0
поехали = 0
номер_полигона = 0
номер_полигона = 1
поехали = 0
мой_курс = 0
черная = 1
белая = 0
StartbitV2.startbit_Init()
StartbitV2.lineFollow_iic_init(StartbitV2.startbit_iic.PORT4)
Полигон_пройден = 0
while not (input.button_is_pressed(Button.A)):
    тест_датчиков()
    basic.pause(200)

def on_forever():
    global номер_полигона
    if поехали == 1:
        if номер_полигона == 1:
            basic.show_number(номер_полигона)
            Старт()
            первый_полигон()
            номер_полигона += 1
        elif номер_полигона == 3:
            basic.show_number(номер_полигона)
            Старт()
            лабиринт_туда()
            номер_полигона += 1
        elif номер_полигона == 2:
            basic.show_number(номер_полигона)
            Старт()
            инверсия()
            номер_полигона += 1
        elif номер_полигона == 4:
            basic.show_number(номер_полигона)
            Старт()
            номер_полигона += 1
        elif номер_полигона == 5:
            basic.show_number(номер_полигона)
            Старт()
            инверсия()
            номер_полигона += 1
        elif номер_полигона == 6:
            basic.show_number(номер_полигона)
            Старт()
            лабиринт_обратно()
            номер_полигона += 1
        elif номер_полигона == 7:
            basic.show_number(номер_полигона)
            Старт()
            первый_полигон()
basic.forever(on_forever)
