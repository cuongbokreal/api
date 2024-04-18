import pygame
import time
import random

pygame.init()

#setting screen
screen_ratio = 0.4
SCREEN_WIDTH = int(1080 * screen_ratio)
SCREEN_HEIGHT = int(1920 * screen_ratio)

timeEachWhile = 0.02
timeEachAppear = 0.3
timeEachDisappear = 1
listTimeExist = [3,4,5] #list time để random thời gian tồn tại cho mouse

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
#font = pygame.font.Font(None, 64)  # Chọn font mặc định với kích cỡ 64
def draw_text_center(text, x, y, size=64, color=WHITE):
    font = pygame.font.Font(None, size)
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.center = (x, y)
    screen.blit(text_surface, text_rect)

#cd 'C:\Users\NGOC DUNG\OneDrive - Hanoi University of Mining and Geology\A_HUMG_code\PYTHON2\whac-a-mole'
class Mouses:
    def __init__(self):
        self.listMouse = []

    def add(self, mouse):
        self.listMouse.append(mouse)

    def create(self):
        listIndex = [1,2,3,4,5,6,7,8,9] #những index cho thể tạo mới
        for mouse in self.listMouse:
            listIndex.remove(mouse.getData()["index"]) #xóa những index đã có
        newIndex = random.choice(listIndex)
        newProcess = timeEachWhile
        newDisappear = random.choice(listTimeExist)
        newMouse = Mouse(newIndex, newProcess, newDisappear, timeEachAppear, 0)
        print(newMouse.getData())
        self.listMouse.append(newMouse)

    def remove(self, mouse):
        self.listMouse.remove(mouse)
    def get(self):
        return self.listMouse

class Mouse:
    def __init__(self, index, process, disAppear, appear, timer):
        self.index = index
        self.process = process
        self.disAppear = disAppear
        self.appear = appear
        self.timer = timer

    def getData(self):
        return {
            'index': self.index,
            'process': self.process,
            'disAppear': self.disAppear,
            'appear': self.appear,
            'timer': self.timer,
        }

# Tạo cửa sổ và đặt hình ảnh nền
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
background = pygame.image.load('assets/background.png').convert()  # Chuyển đổi sang định dạng màu chính xác của pygame
background = pygame.transform.scale(background, (SCREEN_WIDTH, SCREEN_HEIGHT))  # Scale hình ảnh nền để vừa khít với kích thước của cửa sổ

pygame.display.set_caption("Đập chuột")

hammer = pygame.image.load('assets/hammer.png')
hammer = pygame.transform.scale(hammer, (int(SCREEN_WIDTH / 3), int(SCREEN_WIDTH / 3)))  # Scale hình ảnh "hammer" sao cho chiều ngang của nó bằng 1/3 chiều ngang của cửa sổ

mouseImg = pygame.image.load('assets/lthuy.png')
mouseImg = pygame.transform.scale(mouseImg, (int(SCREEN_WIDTH / 5.5), int(SCREEN_WIDTH / 5.5)))
mouseHeight = mouseImg.get_height()
mouseWidth = mouseImg.get_width()

space_height = [
    int(SCREEN_HEIGHT / 2) + int(SCREEN_HEIGHT * 0.09/10), 
    int(SCREEN_HEIGHT / 2) + int(SCREEN_HEIGHT *1.8/10), 
    int(SCREEN_HEIGHT / 2) + int(SCREEN_HEIGHT *3.54/10)
    ]
space_width = [
    int(SCREEN_WIDTH*1/7), 
    int(SCREEN_WIDTH*3.1/7), 
    int(SCREEN_WIDTH*5.15/7)
    ]

spaces = [(x, y) for x in space_width for y in space_height]

def draw_hammer(screen, pos, rotate=0):
    #screen.blit(background, (0, 0))
    screen.blit(pygame.transform.rotate(hammer, rotate), (pos[0] - int(SCREEN_WIDTH / 10), pos[1] - int(SCREEN_WIDTH / 10)))
    pygame.display.flip()

def draw_mouse(screen, pos, rotate=0, crop=1):
    #screen.blit(background, (0, 0))
    cropped_mouse = pygame.Surface((mouseWidth, mouseHeight*crop), pygame.SRCALPHA) #tạo layer trong suốt
    cropped_mouse.blit(mouseImg, (0, 0), (0, 0, mouseWidth, mouseHeight*crop)) #fill hình vào layer trong suôt
    screen.blit(pygame.transform.rotate(cropped_mouse, rotate), (pos[0], pos[1]))
    pygame.display.flip()

# Vị trí khởi đầu của giá đỡ
hammer_pos = (50, 50)
draw_hammer(screen, hammer_pos)


#setting mouse:
mouses = Mouses()
mouses.create() #tạo con chuột mới

hammerIndex = (0,0) #index con chuột máy tính

processHammer = 0
timeHammer = 0.5

scores = 0
hearts = 5

running = True
while running:
    screen.blit(background, (0, 0))
    if hearts <= 0: #thua cmnr
        #running = False
        try:
            scores_txt = open('scores.txt', 'r+')
            scores_record = int(scores_txt.readline())
            #scores_txt.close()
            max_record = scores_record
            if scores > scores_record:
                scores_txt.seek(0)
                scores_txt.truncate() #xóa kỉ lục cũ
                scores_txt.write(str(scores)) #thêm kỉ lục mới
                max_record = scores
            draw_text_center(f"Ky luc: {max_record}", SCREEN_WIDTH // 2, SCREEN_HEIGHT * 0.175, 30, BLACK)
            
        except:
            print('Không tìm thấy kỷ lục')
        draw_text_center(f"So diem cua ban: {scores}", SCREEN_WIDTH // 2, SCREEN_HEIGHT * 0.15, 30, BLACK)
        draw_text_center(f"Nhan Q hoac ESC de thoat", SCREEN_WIDTH // 2, SCREEN_HEIGHT * 0.23, 30, BLACK)
        draw_text_center(f"Nhan phim bat ky de choi lai", SCREEN_WIDTH // 2, SCREEN_HEIGHT * 0.26, 30, BLACK)
    else:
        #text score
        draw_text_center(f"Score: {scores}", SCREEN_WIDTH // 2, SCREEN_HEIGHT * 0.15, 50, BLACK)
        #heart
        draw_text_center(f"{'#'*hearts}", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.05, 30, BLACK)
        #print mouse
        for mouse in mouses.get():
            thisMouseData = mouse.getData()
            if thisMouseData["timer"] < thisMouseData["disAppear"]: #chưa quá thời gian end
                if thisMouseData["process"] < thisMouseData["appear"]: #chưa xuất hiện lên xong
                    mouse.process = mouse.process + timeEachWhile #côngj thêm process 
                (x, y) = spaces[thisMouseData["index"]-1]
                y -= (mouseHeight * (thisMouseData["process"] / timeEachAppear))
                draw_mouse(screen, (x,y), 0, (thisMouseData["process"] / timeEachAppear))
            else:
                mouses.remove(mouse)
                hearts -= 1
                mouses.create()
            
            mouse.timer = mouse.timer + timeEachWhile #cộng thêm thời gian

        # for space in spaces:
        #     x = space[0]
        #     y =space[1]
        #     pygame.draw.rect(screen, (255, 255, 255), pygame.Rect(x, y, 50, 50))
            
        
    thisEvent = pygame.event.get()
    if len(thisEvent) >0:
        for event in thisEvent:
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q or event.key == pygame.K_ESCAPE:
                    running = False
                elif hearts <= 0:
                    hearts = 5
                    scores = 0

            elif event.type == pygame.MOUSEBUTTONDOWN:
                # Lấy tọa độ chuột khi nhấp chuột
                hammerIndex = pygame.mouse.get_pos()
                draw_hammer(screen, hammerIndex, 20)
                print("Tọa độ chuột:", hammerIndex)
                
                (x,y) = hammerIndex
                for mouse in mouses.get():
                    thisMouseData = mouse.getData()
                    space = spaces[thisMouseData['index'] -1]
                    print(space)
                    print(space[0]< x < space[0] + mouseWidth)
                    print(space[1] < y < space[1] - mouseHeight)
                    if space[0]< x < space[0] + mouseWidth +20 and space[1] - mouseHeight -20 < y < space[1]: #đập trúng
                        scores += 1
                        mouses.remove(mouse)
                        mouses.create()
                    else:
                        hearts -= 1
                        print(hearts)

            elif event.type == pygame.MOUSEMOTION:
                hammerIndex = pygame.mouse.get_pos()
                draw_hammer(screen, hammerIndex)
    else:
        draw_hammer(screen, hammerIndex) #không có sự kiện gì thì vẫn vẽ hammer


    pygame.display.flip() #vẽ xong hết rồi cập nhật
    time.sleep(timeEachWhile) # Delay để giảm lag

pygame.quit()
print('Done')
