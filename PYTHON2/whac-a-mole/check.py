import pygame
import time
import random

pygame.init()

#setting screen
screen_ratio = 0.4
SCREEN_WIDTH = int(1080 * screen_ratio)
SCREEN_HEIGHT = int(1920 * screen_ratio)

# Tạo cửa sổ và đặt hình ảnh nền
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
background = pygame.image.load('assets/background.png').convert()  # Chuyển đổi sang định dạng màu chính xác của pygame
background = pygame.transform.scale(background, (SCREEN_WIDTH, SCREEN_HEIGHT))  # Scale hình ảnh nền để vừa khít với kích thước của cửa sổ

pygame.display.set_caption("Đập chuột")

mouseImg = pygame.image.load('assets/dling.png')
mouseImg = pygame.transform.scale(mouseImg, (int(SCREEN_WIDTH / 4.5), int(SCREEN_WIDTH / 4.5)))

print(mouseImg.get_height())

x = 0
y = 0


pygame.quit()