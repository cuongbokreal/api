import pygame
import sys

# Khởi tạo Pygame
pygame.init()

# Cài đặt màn hình
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Vẽ chữ pygame")

# Màu sắc
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Tạo font
font = pygame.font.Font(None, 64)  # Chọn font mặc định với kích cỡ 64

# Tạo văn bản
text_surface = font.render("pygame", True, BLACK)

# Lấy kích thước của văn bản
text_rect = text_surface.get_rect()

# Đặt vị trí của văn bản ở giữa màn hình
text_rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)

# Vòng lặp chính
running = True
while running:
    screen.fill(WHITE)  # Xóa màn hình với màu trắng
    
    # Vẽ văn bản
    screen.blit(text_surface, text_rect)
    
    pygame.display.flip()  # Cập nhật màn hình

    # Kiểm tra sự kiện
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

# Kết thúc Pygame
pygame.quit()
sys.exit()
