
        const videoFeed = document.getElementById('videoFeed');
        const captureButton = document.getElementById('captureButton');
        const combineButton = document.getElementById('combineButton');
        const retakeButton = document.getElementById('retakeButton');
        const saveButton = document.getElementById('saveButton');
        const printButton = document.getElementById('printButton');
        const layoutButtons = document.querySelectorAll('.control-button[data-layout]');
        const thumbnailsContainer = document.getElementById('thumbnailsContainer');
        const currentPhotoCountSpan = document.getElementById('currentPhotoCount');
        const totalPhotosNeededSpan = document.getElementById('totalPhotosNeeded');
        const combinedCanvas = document.getElementById('combinedCanvas');
        const combinedCtx = combinedCanvas.getContext('2d');
        const liveCombinedCanvas = document.getElementById('liveCombinedCanvas'); // Live preview canvas
        const liveCombinedCtx = liveCombinedCanvas.getContext('2d'); // Live preview context
        const liveCanvasWrapper = document.querySelector('.live-canvas-wrapper'); // New: Reference to the wrapper
        const cameraStage = document.getElementById('cameraStage');
        const previewStage = document.getElementById('previewStage');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const countdownElement = document.getElementById('countdown');

        // Decoration elements
        const backgroundColorPicker = document.getElementById('backgroundColor');
        const transparentBackgroundColorCheckbox = document.getElementById('transparentBackgroundColor'); // New
        const borderColorPicker = document.getElementById('borderColor');
        const transparentBorderColorCheckbox = document.getElementById('transparentBorderColor'); // New
        const syncColorsCheckbox = document.getElementById('syncColors'); // New
        const borderWidthSlider = document.getElementById('borderWidth');
        const borderWidthValueSpan = document.getElementById('borderWidthValue');
        const imageGapSlider = document.getElementById('imageGap'); // New
        const imageGapValueSpan = document.getElementById('imageGapValue'); // New
        const bottomCaptionTextInput = document.getElementById('bottomCaptionText'); // Renamed captionTextInput
        const topCaptionTextInput = document.getElementById('topCaptionText'); // New
        const fontColorPicker = document.getElementById('fontColor');
        const fontSizeSlider = document.getElementById('fontSize');
        const fontSizeValueSpan = document.getElementById('fontSizeValue');
        const applyDecorationsButton = document.getElementById('applyDecorationsButton');

        // New text style elements
        const fontFamilySelect = document.getElementById('fontFamily');
        const isBoldCheckbox = document.getElementById('isBold');
        const isItalicCheckbox = document.getElementById('isItalic');


        // Pattern selectors
        const topPatternSelector = document.getElementById('topPatternSelector');
        const bottomPatternSelector = document.getElementById('bottomPatternSelector');
        const overlayPatternSelector = document.getElementById('overlayPatternSelector'); // New
        let selectedTopPattern = ''; // Stores URL of selected top pattern
        let selectedBottomPattern = ''; // Stores URL of selected bottom pattern
        let selectedOverlayPattern = ''; // New: Stores URL of selected overlay pattern

        // Filter elements
        const contrastSlider = document.getElementById('contrast');
        const contrastValueSpan = document.getElementById('contrastValue');
        const brightnessSlider = document.getElementById('brightness'); // Now Exposure / Brightness
        const brightnessValueSpan = document.getElementById('brightnessValue');
        const saturationSlider = document.getElementById('saturation'); // New
        const saturationValueSpan = document.getElementById('saturationValue');
        const warmthSlider = document.getElementById('warmth'); // New
        const warmthValueSpan = document.getElementById('warmthValue');
        const grayscaleSlider = document.getElementById('grayscale');
        const grayscaleValueSpan = document.getElementById('grayscaleValue');
        const sharpenSlider = document.getElementById('sharpen'); // New (limited functionality)
        const sharpenValueSpan = document.getElementById('sharpenValue');
        const shadowsSlider = document.getElementById('shadows'); // New (limited functionality)
        const shadowsValueSpan = document.getElementById('shadowsValue');
        const highlightsSlider = document.getElementById('highlights'); // New (limited functionality)
        const highlightsValueSpan = document.getElementById('highlightsValue');
        const claritySlider = document.getElementById('clarity'); // New (limited functionality)
        const clarityValueSpan = document.getElementById('clarityValue');
        // Removed: skinSmoothingSlider, skinWhiteningSlider, lipstickColorPicker

        // Message Box elements
        const messageBox = document.getElementById('messageBox');
        const messageText = document.getElementById('messageText');
        const messageBoxClose = document.getElementById('messageBoxClose');


        let stream;
        let capturedPhotos = []; // Stores Image objects for easier manipulation
        let selectedLayout = 4; // Default layout
        let photoWidth = 640; // Desired capture width (4:3 aspect ratio)
        let photoHeight = 480; // Desired capture height (4:3 aspect ratio)

        // Store original images for re-applying filters/decorations
        let originalCombinedImage = null; // Used for previewStage canvas

        let animationFrameId; // To control the requestAnimationFrame loop

        // JSON list for image patterns
        const topPatternList = [
            { id: 'none', name: 'Không có', thumbnail: 'https://placehold.co/120x60/ffffff/000000?text=None', src: '' },
            { id: 'pattern1', name: 'Họa tiết 1', thumbnail: 'https://placehold.co/120x60/f0f9ff/0f172a?text=Pattern1', src: 'https://placehold.co/1200x60/f0f9ff/0f172a?text=Pattern1' },
            { id: 'pattern2', name: 'Họa tiết 2', thumbnail: 'https://placehold.co/120x60/eef2ff/1e293b?text=Pattern2', src: 'https://placehold.co/1200x60/eef2ff/1e293b?text=Pattern2' },
            { id: 'pattern3', name: 'Họa tiết 3', thumbnail: 'https://placehold.co/120x60/f0fdf4/14532d?text=Pattern3', src: 'https://placehold.co/1200x60/f0fdf4/14532d?text=Pattern3' },
            { id: 'pattern4', name: 'Họa tiết 4', thumbnail: 'https://placehold.co/120x60/fff7ed/9a3412?text=Pattern4', src: 'https://placehold.co/1200x60/fff7ed/9a3412?text=Pattern4' }
        ];

        const bottomPatternList = [
            { id: 'none', name: 'Không có', thumbnail: 'https://placehold.co/120x60/ffffff/000000?text=None', src: '' },
            { id: 'pattern5', name: 'Họa tiết 5', thumbnail: 'https://placehold.co/120x60/add8e6/00008b?text=Pattern5', src: 'https://placehold.co/1200x60/add8e6/00008b?text=Pattern5' },
            { id: 'pattern6', name: 'Họa tiết 6', thumbnail: 'https://placehold.co/120x60/ffe4e1/8b0000?text=Pattern6', src: 'https://placehold.co/1200x60/ffe4e1/8b0000?text=Pattern6' },
            { id: 'pattern7', name: 'Họa tiết 7', thumbnail: 'https://placehold.co/120x60/c8a2c8/4b0082?text=Pattern7', src: 'https://placehold.co/1200x60/c8a2c8/4b0082?text=Pattern7' },
            { id: 'pattern8', name: 'Họa tiết 8', thumbnail: 'https://placehold.co/120x60/d3d3d3/2f4f4f?text=Pattern8', src: 'https://placehold.co/1200x60/d3d3d3/2f4f4f?text=Pattern8' }
        ];

        // New JSON list for overlay patterns
        const overlayPatternList = [
            { id: 'none', name: 'Không có', thumbnail: 'https://placehold.co/120x60/ffffff/000000?text=None', src: '' },
            { id: 'overlay1', name: 'Lớp phủ 1', thumbnail: 'https://placehold.co/120x60/d3d3d3/000000?text=O1', src: 'https://placehold.co/1200x800/d3d3d3/000000?text=Overlay1' },
            { id: 'overlay2', name: 'Lớp phủ 2', thumbnail: 'https://placehold.co/120x60/c0c0c0/000000?text=O2', src: 'https://placehold.co/1200x800/c0c0c0/000000?text=Overlay2' },
            { id: 'overlay3', name: 'Lớp phủ 3', thumbnail: 'https://placehold.co/120x60/add8e6/00008b?text=O3', src: 'https://placehold.co/1200x800/add8e6/00008b?text=Overlay3' }
        ];

        // --- Utility Functions ---

        /**
         * Hiển thị hộp thông báo tùy chỉnh.
         * @param {string} message - Tin nhắn muốn hiển thị.
         */
        function showMessageBox(message) {
            messageText.textContent = message;
            messageBox.classList.remove('hidden');
        }

        /**
         * Ẩn hộp thông báo tùy chỉnh.
         */
        function hideMessageBox() {
            messageBox.classList.add('hidden');
        }

        /**
         * Hiển thị vòng quay loading.
         * Displays a loading spinner.
         */
        function showLoading() {
            loadingSpinner.style.display = 'block';
        }

        /**
         * Ẩn vòng quay loading.
         * Hides the loading spinner.
         */
        function hideLoading() {
            loadingSpinner.style.display = 'none';
        }

        /**
         * Chuyển đổi giữa các stage (Camera, Preview).
         * Switches between different application stages (Camera, Preview).
         * @param {HTMLElement} stageToShow - The stage element to show.
         */
        function switchStage(stageToShow) {
            cameraStage.classList.remove('active');
            previewStage.classList.remove('active');
            stageToShow.classList.add('active');

            if (stageToShow === previewStage) {
                // Ensure combinedCanvas is displayed when entering preview stage
                // This is crucial to make sure the canvas is visible before drawing on it.
                combinedCanvas.style.display = 'block';
            }
        }

        /**
         * Cập nhật số lượng ảnh đã chụp và tổng số cần chụp.
         * Updates the display for the number of captured photos vs. total needed.
         */
        function updatePhotoCountDisplay() {
            currentPhotoCountSpan.textContent = capturedPhotos.length;
            totalPhotosNeededSpan.textContent = selectedLayout;
            if (capturedPhotos.length === selectedLayout) {
                captureButton.disabled = true;
                captureButton.textContent = 'Đã đủ ảnh';
                combineButton.classList.remove('hidden');
            } else {
                captureButton.disabled = false;
                captureButton.innerHTML = `Chụp ảnh (<span id="currentPhotoCount">${capturedPhotos.length}</span>/<span id="totalPhotosNeeded">${selectedLayout}</span>)`;
                combineButton.classList.add('hidden');
            }
        }

        /**
         * Hiển thị ảnh chụp nhỏ dưới dạng thumbnail.
         * Displays a captured photo as a small thumbnail.
         * @param {Image} imageObject - The Image object of the captured photo.
         */
        function displayThumbnail(imageObject) {
            const imgElement = document.createElement('img');
            imgElement.src = imageObject.src;
            imgElement.alt = `Ảnh đã chụp ${capturedPhotos.length}`;
            imgElement.classList.add('w-full', 'h-auto', 'rounded-md', 'object-cover'); // object-cover for consistency
            imgElement.style.aspectRatio = '4 / 3'; // Ensure 4:3 aspect ratio for thumbnails

            const thumbContainer = document.createElement('div');
            thumbContainer.classList.add('thumbnail-container');
            thumbContainer.appendChild(imgElement);
            thumbnailsContainer.appendChild(thumbContainer);
        }

        /**
         * Bắt đầu camera và vòng lặp xem trước trực tiếp.
         * Starts the camera feed and the live preview animation loop.
         */
        async function startCamera() {
            showLoading();
            try {
                // Request video with specific resolution and aspect ratio
                stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: photoWidth }, height: { ideal: photoHeight }, aspectRatio: 4/3 }, audio: false });
                videoFeed.srcObject = stream;
                videoFeed.onloadedmetadata = () => {
                    hideLoading();
                    videoFeed.play();
                    startLivePreviewLoop(); // Start drawing loop for live preview
                };
            } catch (err) {
                console.error("Lỗi khi truy cập camera: ", err);
                hideLoading();
                showMessageBox("Không thể truy cập camera. Vui lòng cấp quyền truy cập.");
            }
        }

        /**
         * Dừng camera và vòng lặp xem trước trực tiếp.
         * Stops the camera feed and the live preview animation loop.
         */
        function stopCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoFeed.srcObject = null;
            }
            cancelAnimationFrame(animationFrameId); // Stop the animation loop
        }

        /**
         * Hiển thị đếm ngược trước khi chụp ảnh.
         * Displays a countdown before capturing a photo.
         * @param {number} count - The number of seconds for the countdown.
         * @returns {Promise<void>} - A Promise that resolves when the countdown finishes.
         */
        function startCountdown(count) {
            return new Promise(resolve => {
                let currentCount = count;
                countdownElement.textContent = currentCount;
                countdownElement.classList.remove('opacity-0');
                countdownElement.classList.add('opacity-100');

                const interval = setInterval(() => {
                    currentCount--;
                    if (currentCount > 0) {
                        countdownElement.textContent = currentCount;
                    } else {
                        clearInterval(interval);
                        countdownElement.textContent = '';
                        countdownElement.classList.remove('opacity-100');
                        countdownElement.classList.add('opacity-0');
                        resolve();
                    }
                }, 1000);
            });
        }


        /**
         * Chụp ảnh từ video feed.
         * Captures a photo from the video feed.
         */
        async function capturePhoto() {
            if (capturedPhotos.length >= selectedLayout) {
                showMessageBox(`Bạn đã chụp đủ ${selectedLayout} ảnh rồi! Vui lòng kết hợp hoặc chụp lại.`);
                return;
            }

            captureButton.disabled = true; // Disable button during countdown and capture
            cancelAnimationFrame(animationFrameId); // Pause live preview drawing during countdown and capture

            await startCountdown(3); // Start 3-second countdown

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Set canvas dimensions to match the 4:3 aspect ratio
            canvas.width = photoWidth;
            canvas.height = photoHeight;

            // Draw the video frame to the canvas, mirroring it horizontally
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(videoFeed, 0, 0, canvas.width, canvas.height);

            // Get the image data
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9); // Quality 0.9 for better size/quality balance

            // Create an Image object to store and display
            const img = new Image();
            img.onload = () => {
                capturedPhotos.push(img);
                displayThumbnail(img);
                updatePhotoCountDisplay();
                startLivePreviewLoop(); // Restart live preview drawing after capture
                captureButton.disabled = false; // Re-enable button after capture
            };
            img.src = dataUrl;
        }

        /**
         * Tính toán kích thước và vị trí của các ô ảnh trong canvas tổng hợp.
         * Calculates the dimensions and positions of photo slots within the combined canvas.
         * @param {number} layout - The number of photos in the layout.
         * @param {number} basePhotoW - Base width of a single photo.
         * @param {number} basePhotoH - Base height of a single photo.
         * @param {number} innerImageGap - Spacing between photos/border inside the grid.
         * @returns {object} - { photoGridContentWidth, photoGridContentHeight, photoRows, photoCols }
         */
        function calculateLayoutDimensions(layout, basePhotoW, basePhotoH, innerImageGap) {
            let photoRows, photoCols;
            let photoGridContentWidth, photoGridContentHeight; // Dimensions of the area that contains photos and their *internal* borders/spacing

            switch (layout) {
                case 3: // 1x3 vertical strip
                    photoRows = 3; photoCols = 1;
                    photoGridContentWidth = basePhotoW + (innerImageGap * 2); // Photo width + internal spacing on left/right
                    photoGridContentHeight = (basePhotoH * 3) + (innerImageGap * 4); // 3 photos height + spacing between photos + spacing top/bottom
                    break;
                case 4: // 4 photos in 1 column (vertical strip)
                    photoRows = 4; photoCols = 1;
                    photoGridContentWidth = basePhotoW + (innerImageGap * 2);
                    photoGridContentHeight = (basePhotoH * 4) + (innerImageGap * 5);
                    break;
                case 6: // 2x3 grid
                    photoRows = 3; photoCols = 2;
                    photoGridContentWidth = (basePhotoW * 2) + (innerImageGap * 3);
                    photoGridContentHeight = (basePhotoH * 3) + (innerImageGap * 4);
                    break;
                case 8: // 2x4 grid
                    photoRows = 4; photoCols = 2;
                    photoGridContentWidth = (basePhotoW * 2) + (innerImageGap * 3);
                    photoGridContentHeight = (basePhotoH * 4) + (innerImageGap * 5);
                    break;
                default:
                    console.warn("Bố cục không hợp lệ. Mặc định 4 ảnh.");
                    photoRows = 4; photoCols = 1; // Default to 4 in 1 column
                    photoGridContentWidth = basePhotoW + (innerImageGap * 2);
                    photoGridContentHeight = (basePhotoH * 4) + (innerImageGap * 5);
                    break;
            }
            return { photoGridContentWidth, photoGridContentHeight, photoRows, photoCols };
        }


        /**
         * Applies basic sharpening by adjusting pixel values based on neighbors.
         * This is a very simple and limited approximation (often looks like increased contrast).
         * @param {CanvasRenderingContext2D} ctx - The canvas context.
         * @param {number} x - X coordinate to start.
         * @param {number} y - Y coordinate to start.
         * @param {number} width - Width of the area.
         * @param {number} height - Height of the area.
         * @param {number} amount - Sharpening amount (0-100).
         */
        function applySharpen(ctx, x, y, width, height, amount) {
            if (amount === 0) return;
            // A simple approximation of sharpen by applying a convolution filter (unsharp mask is more complex)
            // This often just looks like increased contrast, true sharpening is more involved.
            const imageData = ctx.getImageData(x, y, width, height);
            const pixels = imageData.data;
            const factor = amount / 100 * 0.5; // Scale amount

            const weights = [
                0, -1, 0,
                -1, 5, -1,
                0, -1, 0
            ]; // Simple sharpen kernel (high pass)

            const tempPixels = new Uint8ClampedArray(pixels.length);

            for (let i = 0; i < pixels.length; i += 4) {
                const row = Math.floor((i / 4) / width);
                const col = (i / 4) % width;

                let r = 0, g = 0, b = 0;

                for (let k = 0; k < 9; k++) {
                    const weight = weights[k];
                    const xOffset = (k % 3) - 1;
                    const yOffset = Math.floor(k / 3) - 1;

                    const neighborX = col + xOffset;
                    const neighborY = row + yOffset;

                    if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                        const neighborIndex = (neighborY * width + neighborX) * 4;
                        r += pixels[neighborIndex];
                        g += pixels[neighborIndex + 1];
                        b += pixels[neighborIndex + 2];
                        count++;
                    }
                }

                tempPixels[i] = Math.min(255, Math.max(0, pixels[i] + (r - pixels[i]) * factor));
                tempPixels[i + 1] = Math.min(255, Math.max(0, pixels[i + 1] + (g - pixels[i + 1]) * factor));
                tempPixels[i + 2] = Math.min(255, Math.max(0, pixels[i + 2] + (b - pixels[i + 2]) * factor));
                tempPixels[i + 3] = pixels[i + 3]; // Alpha
            }
            imageData.data.set(tempPixels);
            ctx.putImageData(imageData, x, y);
        }

        /**
         * Adjusts shadows by manipulating pixel values. Limited functionality.
         * @param {CanvasRenderingContext2D} ctx - The canvas context.
         * @param {number} x - X coordinate to start.
         * @param {number} y - Y coordinate to start.
         * @param {number} width - Width of the area.
         * @param {number} height - Height of the area.
         * @param {number} amount - Shadow adjustment amount (-100 to 100).
         */
        function applyShadows(ctx, x, y, width, height, amount) {
            if (amount === 0) return;
            // Very basic approximation: darkens/lightens darker pixels
            const imageData = ctx.getImageData(x, y, width, height);
            const pixels = imageData.data;
            const factor = amount / 100 * 0.5; // Scale amount

            for (let i = 0; i < pixels.length; i += 4) {
                const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                if (avg < 128) { // Target darker pixels
                    pixels[i] = pixels[i] * (1 + factor);
                    pixels[i + 1] = pixels[i + 1] * (1 + factor);
                    pixels[i + 2] = pixels[i + 2] * (1 + factor);
                }
            }
            ctx.putImageData(imageData, x, y);
        }

        /**
         * Adjusts highlights by manipulating pixel values. Limited functionality.
         * @param {CanvasRenderingContext2D} ctx - The canvas context.
         * @param {number} x - X coordinate to start.
         * @param {number} y - Y coordinate to start.
         * @param {number} width - Width of the area.
         * @param {number} height - Height of the area.
         * @param {number} amount - Highlight adjustment amount (-100 to 100).
         */
        function applyHighlights(ctx, x, y, width, height, amount) {
            if (amount === 0) return;
            // Very basic approximation: darkens/lightens brighter pixels
            const imageData = ctx.getImageData(x, y, width, height);
            const pixels = imageData.data;
            const factor = amount / 100 * 0.5; // Scale amount

            for (let i = 0; i < pixels.length; i += 4) {
                const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                if (avg >= 128) { // Target brighter pixels
                    pixels[i] = pixels[i] * (1 + factor);
                    pixels[i + 1] = pixels[i + 1] * (1 + factor);
                    pixels[i + 2] = pixels[i + 2] * (1 + factor);
                }
            }
            ctx.putImageData(imageData, x, y);
        }

        /**
         * Adjusts clarity (often mid-tone contrast). Limited functionality.
         * @param {CanvasRenderingContext2D} ctx - The canvas context.
         * @param {number} x - X coordinate to start.
         * @param {number} y - Y coordinate to start.
         * @param {number} width - Width of the area.
         * @param {number} height - Height of the area.
         * @param {number} amount - Clarity adjustment amount (0-100).
         */
        function applyClarity(ctx, x, y, width, height, amount) {
            if (amount === 0) return;
            // A simple approximation, often involves mid-tone contrast or local contrast enhancement.
            // This is a very rough pixel manipulation.
            const imageData = ctx.getImageData(x, y, width, height);
            const pixels = imageData.data;
            const factor = amount / 100 * 0.2; // Small factor for subtle effect

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];

                // Simple contrast adjustment applied to mid-tones
                pixels[i] = r + (r - 128) * factor;
                pixels[i + 1] = g + (g - 128) * factor;
                pixels[i + 2] = b + (b - 128) * factor;

                // Clamp values
                pixels[i] = Math.min(255, Math.max(0, pixels[i]));
                pixels[i + 1] = Math.min(255, Math.max(0, pixels[i + 1]));
                pixels[i + 2] = Math.min(255, Math.max(0, pixels[i + 2]));
            }
            ctx.putImageData(imageData, x, y);
        }


        /**
         * Vẽ preview trực tiếp hoặc ảnh cuối cùng lên canvas.
         * Draws the live preview or the final combined image onto a canvas.
         * @param {Array<Image>} images - Array of captured Image objects.
         * @param {number} layout - The number of photos in the layout.
         * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
         * @param {HTMLCanvasElement} targetCanvas - The target canvas element to draw on.
         * @param {object} decorations - Decoration options.
         * @param {string} decorations.backgroundColor - Background color (can be transparent).
         * @param {string} decorations.borderColor - Border color (can be transparent).
         * @param {number} decorations.borderWidth - Width of the outer border.
         * @param {number} decorations.innerImageGap - Gap between images. // New param
         * @param {string} decorations.topCaptionText - Text for the top caption.
         * @param {string} decorations.bottomCaptionText - Text for the bottom caption.
         * @param {string} decorations.fontFamily - Font family for captions.
         * @param {boolean} decorations.isBold - Whether caption text should be bold.
         * @param {boolean} decorations.isItalic - Whether caption text should be italic.
         * @param {string} decorations.topPattern - URL for the top pattern image.
         * @param {string} decorations.bottomPattern - URL for the bottom pattern image.
         * @param {string} decorations.overlayPattern - URL for the overlay pattern image.
         * @param {boolean} isLivePreview - Flag indicating if it's a live preview.
         * @param {object} filters - Filter options (only applied to final canvas).
         */
        async function drawCombinedImage(images, layout, ctx, targetCanvas, decorations = {}, isLivePreview = false, filters = {}) {
            const basePhotoW = photoWidth;
            const basePhotoH = photoHeight;
            const outerBorderWidth = isLivePreview ? 5 : (decorations.borderWidth || 0); // This is the main border around the entire card
            const innerImageGap = isLivePreview ? 5 : (decorations.innerImageGap || 10); // Spacing/border between photos inside the grid
            const patternHeight = isLivePreview ? 30 : 60; // Smaller patterns for live preview
            const textPadding = 10; // Padding from text to edge/pattern/photo grid

            // 1. Calculate photo grid dimensions (photos + internal spacing)
            const { photoGridContentWidth, photoGridContentHeight, photoRows, photoCols } = calculateLayoutDimensions(layout, basePhotoW, basePhotoH, innerImageGap);

            // 2. Calculate dynamic caption/pattern heights for total canvas size
            let topCaptionDrawHeight = 0;
            if (decorations.topCaptionText && !isLivePreview) {
                topCaptionDrawHeight = decorations.fontSize * 1.5 + textPadding * 2; // Text height + padding top/bottom
            }
            let bottomCaptionDrawHeight = 0;
            if (decorations.bottomCaptionText && !isLivePreview) {
                bottomCaptionDrawHeight = decorations.fontSize * 1.5 + textPadding * 2; // Text height + padding top/bottom
            }

            let topPatternDrawHeight = decorations.topPattern ? patternHeight : 0;
            let bottomPatternDrawHeight = decorations.bottomPattern ? patternHeight : 0;

            // 3. Calculate total canvas dimensions
            const totalCanvasWidth = photoGridContentWidth + (outerBorderWidth * 2);
            const totalCanvasHeight = photoGridContentHeight + (outerBorderWidth * 2) + topPatternDrawHeight + topCaptionDrawHeight + bottomCaptionDrawHeight + bottomPatternDrawHeight;

            // Set canvas internal resolution based on calculated total dimensions
            // For live preview, scale down internal resolution for performance and clarity on small screens
            if (isLivePreview) {
                const maxLivePreviewInternalWidth = 600; // Max internal width for live preview canvas
                const aspectRatio = totalCanvasHeight / totalCanvasWidth;
                targetCanvas.width = maxLivePreviewInternalWidth;
                targetCanvas.height = maxLivePreviewInternalWidth * aspectRatio;

                // Set a scale transformation for drawing operations
                ctx.save(); // Save current transform state
                ctx.scale(targetCanvas.width / totalCanvasWidth, targetCanvas.height / totalCanvasHeight);
            } else {
                targetCanvas.width = totalCanvasWidth;
                targetCanvas.height = totalCanvasHeight;
            }


            // Clear the canvas and fill with background color (can be transparent)
            ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
            ctx.fillStyle = decorations.backgroundColor || '#ffffff';
            ctx.fillRect(0, 0, totalCanvasWidth, totalCanvasHeight); // Fill using original (unscaled) dimensions for consistency

            // Draw outer border around the entire card (before any other content)
            if (outerBorderWidth > 0) {
                ctx.strokeStyle = decorations.borderColor || '#cccccc';
                ctx.lineWidth = outerBorderWidth;
                ctx.strokeRect(0, 0, totalCanvasWidth, totalCanvasHeight); // Draw using original dimensions
            }

            // Current Y position, starting after the outer border
            let currentYOffset = outerBorderWidth;

            // 4. Draw Top Pattern (inside outer border)
            if (decorations.topPattern) {
                const img = new Image();
                img.crossOrigin = "Anonymous"; // Crucial for preventing tainting
                img.src = decorations.topPattern;
                try {
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                    // Draw pattern to fill the available space within the outer border
                    ctx.drawImage(img, outerBorderWidth, currentYOffset, totalCanvasWidth - (outerBorderWidth * 2), topPatternDrawHeight);
                } catch (e) {
                    console.error("Lỗi tải họa tiết trên:", e);
                }
                currentYOffset += topPatternDrawHeight;
            }

            // 5. Draw Top Caption (inside outer border, after pattern)
            if (decorations.topCaptionText && !isLivePreview) {
                const fontStyle = decorations.isItalic ? 'italic ' : '';
                const fontWeight = decorations.isBold ? 'bold ' : '';
                ctx.fillStyle = decorations.fontColor || '#000000';
                ctx.font = `${fontStyle}${fontWeight}${decorations.fontSize || 30}px ${decorations.fontFamily || 'Inter'}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const textX = totalCanvasWidth / 2; // Center horizontally
                const textY = currentYOffset + (topCaptionDrawHeight / 2);
                ctx.fillText(decorations.topCaptionText, textX, textY);
                currentYOffset += topCaptionDrawHeight;
            }

            // 6. Draw Photos within the grid (inside outer border, after top elements)
            const photoDrawWidth = basePhotoW;
            const photoDrawHeight = basePhotoH;

            for (let i = 0; i < selectedLayout; i++) {
                const r = Math.floor(i / photoCols);
                const c = i % photoCols;

                // Calculate position relative to the photo grid content area
                const x = outerBorderWidth + innerImageGap + c * (photoDrawWidth + innerImageGap);
                const y = currentYOffset + innerImageGap + r * (photoDrawHeight + innerImageGap);

                if (i < images.length) {
                    const img = images[i];
                    if (!isLivePreview) {
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = photoDrawWidth;
                        tempCanvas.height = photoDrawHeight;
                        const tempCtx = tempCanvas.getContext('2d');

                        // Apply standard filters
                        tempCtx.filter = `
                            contrast(${filters.contrast || 100}%)
                            brightness(${filters.brightness || 100}%)
                            grayscale(${filters.grayscale || 0}%)
                            saturate(${filters.saturation || 100}%)
                            sepia(${filters.warmth ? filters.warmth * 0.5 : 0}%) /* Approximate warmth with sepia */
                        `;
                        tempCtx.drawImage(img, 0, 0, photoDrawWidth, photoDrawHeight);

                        // Apply pixel-level filters (limited functionality)
                        if (filters.sharpen > 0) {
                            applySharpen(tempCtx, 0, 0, photoDrawWidth, photoDrawHeight, filters.sharpen);
                        }
                         if (filters.shadows !== 0) { // Adjust shadows
                            applyShadows(tempCtx, 0, 0, photoDrawWidth, photoDrawHeight, filters.shadows);
                        }
                        if (filters.highlights !== 0) { // Adjust highlights
                            applyHighlights(tempCtx, 0, 0, photoDrawWidth, photoDrawHeight, filters.highlights);
                        }
                        if (filters.clarity > 0) { // Adjust clarity
                            applyClarity(tempCtx, 0, 0, photoDrawWidth, photoDrawHeight, filters.clarity);
                        }


                        ctx.drawImage(tempCanvas, x, y, photoDrawWidth, photoDrawHeight);
                    } else {
                        // For live preview, draw without complex filters for performance
                        ctx.drawImage(img, x, y, photoDrawWidth, photoDrawHeight);
                    }
                } else if (i === images.length && isLivePreview && videoFeed.readyState >= 2) {
                    ctx.save();
                    ctx.translate(x + photoDrawWidth, y);
                    ctx.scale(-1, 1);
                    ctx.drawImage(videoFeed, 0, 0, photoDrawWidth, photoDrawHeight);
                    ctx.restore();
                } else {
                    ctx.fillStyle = '#e0e0e0';
                    ctx.fillRect(x, y, photoDrawWidth, photoDrawHeight);
                    ctx.strokeStyle = '#cccccc';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, photoDrawWidth, photoDrawHeight);
                    ctx.fillStyle = '#666';
                    ctx.font = '20px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`Ảnh ${i + 1}`, x + photoDrawWidth / 2, y + photoDrawHeight / 2);
                }
            }

            currentYOffset += photoGridContentHeight; // Move Y to after photo grid

            // 7. Draw Bottom Caption (inside outer border, after photo grid)
            if (decorations.bottomCaptionText && !isLivePreview) {
                const fontStyle = decorations.isItalic ? 'italic ' : '';
                const fontWeight = decorations.isBold ? 'bold ' : '';
                ctx.fillStyle = decorations.fontColor || '#000000';
                ctx.font = `${fontStyle}${fontWeight}${decorations.fontSize || 30}px ${decorations.fontFamily || 'Inter'}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const textX = totalCanvasWidth / 2; // Center horizontally
                const textY = currentYOffset + (bottomCaptionDrawHeight / 2);
                ctx.fillText(decorations.bottomCaptionText, textX, textY);
                currentYOffset += bottomCaptionDrawHeight;
            }

            // 8. Draw Bottom Pattern (inside outer border, at the very bottom)
            if (decorations.bottomPattern) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = decorations.bottomPattern;
                try {
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                    // Draw pattern to fill the available space within the outer border
                    ctx.drawImage(img, outerBorderWidth, currentYOffset, totalCanvasWidth - (outerBorderWidth * 2), bottomPatternDrawHeight);
                } catch (e) {
                    console.error("Lỗi tải họa tiết dưới:", e);
                }
                currentYOffset += bottomPatternDrawHeight;
            }

            // 9. Draw Overlay Pattern (on top of everything else)
            if (decorations.overlayPattern) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = decorations.overlayPattern;
                try {
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                    ctx.save(); // Save current canvas state
                    ctx.globalAlpha = 0.2; // Set transparency (adjust as needed)
                    // Draw overlay to cover the entire canvas area within the outer border
                    ctx.drawImage(img, outerBorderWidth, outerBorderWidth, totalCanvasWidth - (outerBorderWidth * 2), totalCanvasHeight - (outerBorderWidth * 2));
                    ctx.restore(); // Restore canvas state (resets globalAlpha to 1)
                } catch (e) {
                    console.error("Lỗi tải họa tiết lớp phủ:", e);
                }
            }

            // Restore the context transform for live preview after drawing
            if (isLivePreview) {
                ctx.restore();
            }

            // Update original combined image only for the final canvas
            if (!isLivePreview) {
                 originalCombinedImage = new Image();
                 originalCombinedImage.src = combinedCanvas.toDataURL('image/jpeg', 1.0);
            }
        }

        /**
         * Vòng lặp để cập nhật ảnh xem trước trực tiếp liên tục.
         * Animation loop to continuously update the live preview canvas.
         */
        function startLivePreviewLoop() {
            function animate() {
                updateLivePreview();
                animationFrameId = requestAnimationFrame(animate);
            }
            animate();
        }

        /**
         * Cập nhật ảnh xem trước trực tiếp trên màn hình camera.
         * Also updates the live preview canvas wrapper's aspect ratio.
         * Updates the live preview image on the camera stage.
         */
        function updateLivePreview() {
            const currentDecorations = getCurrentDecorationsForLivePreview(); // Get live preview decorations

            // Calculate dimensions needed for the live preview canvas and its wrapper
            const basePhotoW = photoWidth;
            const basePhotoH = photoHeight;
            const outerBorderWidth = 5; // Live preview default
            const innerImageGap = parseInt(imageGapSlider.value, 10); // Use live preview gap
            const patternHeight = 30; // Live preview default
            const textPadding = 10; // Live preview default

            const { photoGridContentWidth, photoGridContentHeight, photoRows, photoCols } = calculateLayoutDimensions(selectedLayout, basePhotoW, basePhotoH, innerImageGap);

            let topCaptionDrawHeight = (currentDecorations.topCaptionText) ? (currentDecorations.fontSize * 1.5 + textPadding * 2) : 0;
            let bottomCaptionDrawHeight = (currentDecorations.bottomCaptionText) ? (currentDecorations.fontSize * 1.5 + textPadding * 2) : 0;

            let topPatternDrawHeight = currentDecorations.topPattern ? patternHeight : 0;
            let bottomPatternDrawHeight = currentDecorations.bottomPattern ? patternHeight : 0;

            const calculatedLiveCanvasWidth = photoGridContentWidth + (outerBorderWidth * 2);
            const calculatedLiveCanvasHeight = photoGridContentHeight + (outerBorderWidth * 2) + topPatternDrawHeight + topCaptionDrawHeight + bottomCaptionDrawHeight + bottomPatternDrawHeight;

            // Update the wrapper's padding-bottom to maintain aspect ratio
            if (liveCanvasWrapper) {
                const aspectRatioPercentage = (calculatedLiveCanvasHeight / calculatedLiveCanvasWidth) * 100;
                liveCanvasWrapper.style.paddingBottom = `${aspectRatioPercentage}%`;
            }

            // Now, draw the content onto the canvas itself
            drawCombinedImage(capturedPhotos, selectedLayout, liveCombinedCtx, liveCombinedCanvas, currentDecorations, true);
        }

        /**
         * Lấy các thiết lập trang trí hiện tại từ UI cho Live Preview.
         * Gets current decoration settings from UI elements, specifically for live preview.
         * @returns {object} - Decoration settings.
         */
        function getCurrentDecorationsForLivePreview() {
            let bgColor = backgroundColorPicker.value;
            let bdColor = borderColorPicker.value;

            if (transparentBackgroundColorCheckbox.checked) {
                bgColor = 'rgba(0,0,0,0)';
            }
            if (syncColorsCheckbox.checked) {
                bdColor = bgColor;
            } else if (transparentBorderColorCheckbox.checked) {
                bdColor = 'rgba(0,0,0,0)';
            }

            return {
                backgroundColor: bgColor,
                borderColor: bdColor,
                borderWidth: parseInt(borderWidthSlider.value, 10),
                innerImageGap: parseInt(imageGapSlider.value, 10), // New
                topCaptionText: topCaptionTextInput.value,
                bottomCaptionText: bottomCaptionTextInput.value,
                fontColor: fontColorPicker.value,
                fontSize: parseInt(fontSizeSlider.value, 10),
                fontFamily: fontFamilySelect.value,
                isBold: isBoldCheckbox.checked,
                isItalic: isItalicCheckbox.checked,
                topPattern: selectedTopPattern,
                bottomPattern: selectedBottomPattern,
                overlayPattern: selectedOverlayPattern, // New
            };
        }


        /**
         * Lấy các thiết lập trang trí hiện tại từ UI cho Final Render.
         * Gets current decoration settings from UI elements, specifically for final render.
         * @returns {object} - Decoration settings.
         */
        function getCurrentDecorations() {
            let bgColor = backgroundColorPicker.value;
            let bdColor = borderColorPicker.value;

            if (transparentBackgroundColorCheckbox.checked) {
                bgColor = 'rgba(0,0,0,0)';
            }
            // If syncColors is checked, override bdColor with bgColor's final value
            if (syncColorsCheckbox.checked) {
                bdColor = bgColor;
            } else if (transparentBorderColorCheckbox.checked) {
                bdColor = 'rgba(0,0,0,0)';
            }

            return {
                backgroundColor: bgColor,
                borderColor: bdColor,
                borderWidth: parseInt(borderWidthSlider.value, 10),
                innerImageGap: parseInt(imageGapSlider.value, 10), // New
                topCaptionText: topCaptionTextInput.value,
                bottomCaptionText: bottomCaptionTextInput.value,
                fontColor: fontColorPicker.value,
                fontSize: parseInt(fontSizeSlider.value, 10),
                fontFamily: fontFamilySelect.value,
                isBold: isBoldCheckbox.checked,
                isItalic: isItalicCheckbox.checked,
                topPattern: selectedTopPattern,
                bottomPattern: selectedBottomPattern,
                overlayPattern: selectedOverlayPattern, // New
            };
        }

        /**
         * Lấy các thiết lập bộ lọc hiện tại từ UI.
         * Gets current filter settings from UI elements.
         * @returns {object} - Filter settings.
         */
        function getCurrentFilters() {
            return {
                contrast: contrastSlider.value,
                brightness: brightnessSlider.value,
                grayscale: grayscaleSlider.value,
                saturation: saturationSlider.value, // New
                warmth: warmthSlider.value,         // New (approximated)
                // The following are currently non-functional with ctx.filter and require pixel manipulation
                sharpen: sharpenSlider.value,
                shadows: shadowsSlider.value,
                highlights: highlightsSlider.value,
                clarity: claritySlider.value,
                // Removed: skinSmoothing, skinWhitening, lipstickColor
            };
        }

        /**
         * Áp dụng các bộ lọc cho ảnh đã kết hợp (trên previewStage).
         * Applies filters to the combined image (on the preview stage).
         */
        async function applyFilters() {
            if (capturedPhotos.length === 0) {
                return;
            }

            await drawCombinedImage(capturedPhotos, selectedLayout, combinedCtx, combinedCanvas,
                                    getCurrentDecorations(), false, getCurrentFilters());
        }

        /**
         * Áp dụng các trang trí cho ảnh đã kết hợp (trên previewStage).
         * Applies decorations to the combined image (on the preview stage).
         */
        async function applyDecorations() {
            if (capturedPhotos.length === 0) {
                showMessageBox("Vui lòng chụp ảnh trước khi trang trí!");
                return;
            }

            await drawCombinedImage(capturedPhotos, selectedLayout, combinedCtx, combinedCanvas,
                                    getCurrentDecorations(), false, getCurrentFilters());
        }

        /**
         * Lưu ảnh kết hợp về máy.
         * Saves the combined photo to the user's device.
         */
        function saveCombinedPhoto() {
            // Check if the canvas has content to save
            if (!combinedCanvas.style.display || combinedCanvas.style.display === 'none' || combinedCanvas.width === 0 || combinedCanvas.height === 0) {
                showMessageBox("Không có ảnh để lưu. Vui lòng kết hợp ảnh trước.");
                return;
            }
            const dataUrl = combinedCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'photobooth-cua-ban.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showMessageBox("Ảnh đã được lưu!");
        }

        /**
         * In ảnh kết hợp.
         * Prints the combined photo.
         */
        function printCombinedPhoto() {
            // Check if the canvas has content to print
            if (!combinedCanvas.style.display || combinedCanvas.style.display === 'none' || combinedCanvas.width === 0 || combinedCanvas.height === 0) {
                showMessageBox("Không có ảnh để in. Vui lòng kết hợp ảnh trước.");
                return;
            }
            const dataUrl = combinedCanvas.toDataURL('image/png');
            const win = window.open('', '_blank');
            win.document.write(`
                <html>
                <head>
                    <title>In ảnh</title>
                    <style>
                        @page {
                            size: auto; /* auto is the initial value */
                            margin: 0mm; /* this affects the margin in the printer settings */
                        }
                        body {
                            margin: 0; /* reset body margin */
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh; /* Ensure it takes full viewport height for centering */
                            overflow: hidden; /* Prevent scrollbars from appearing */
                        }
                        img {
                            max-width: 100%;
                            max-height: 98vh; /* Adjust to ensure it fits page height with some buffer */
                            display: block;
                            margin: auto; /* Center image on the page */
                            object-fit: contain; /* Ensure image fits without cropping while maintaining aspect ratio */
                            page-break-after: always; /* Ensure each image prints on a new page */
                        }
                    </style>
                </head>
                <body>
                    <img src="${dataUrl}" onload="setTimeout(() => { window.print(); window.close(); }, 500);" />
                </body>
                </html>
            `);
            win.document.close();
        }

        /**
         * Reset lại photobooth để chụp lại.
         * Resets the photobooth to retake photos.
         */
        function retakePhotos() {
            capturedPhotos = [];
            thumbnailsContainer.innerHTML = '';
            updatePhotoCountDisplay();
            combinedCanvas.style.display = 'none';
            originalCombinedImage = null; // Clear original image
            switchStage(cameraStage); // Go back to camera stage
            startCamera(); // Restart camera and live preview loop
            // Reset decoration/filter sliders and patterns to default for next session
            backgroundColorPicker.value = '#ffffff';
            transparentBackgroundColorCheckbox.checked = false; // Reset
            borderColorPicker.value = '#cccccc';
            transparentBorderColorCheckbox.checked = false;     // Reset
            syncColorsCheckbox.checked = false;                 // Reset
            borderWidthSlider.value = '10';
            borderWidthValueSpan.textContent = '10px';
            imageGapSlider.value = '10'; // Reset new gap slider
            imageGapValueSpan.textContent = '10px'; // Reset new gap slider value display
            topCaptionTextInput.value = '';
            bottomCaptionTextInput.value = '';
            fontColorPicker.value = '#000000';
            fontSizeSlider.value = '30';
            fontSizeValueSpan.textContent = '30px';
            fontFamilySelect.value = 'Inter';
            isBoldCheckbox.checked = false;
            isItalicCheckbox.checked = false;
            // Reset new filter sliders
            contrastSlider.value = '100';
            contrastValueSpan.textContent = '100%';
            brightnessSlider.value = '100';
            brightnessValueSpan.textContent = '100%';
            saturationSlider.value = '100';
            saturationValueSpan.textContent = '100%';
            warmthSlider.value = '0';
            warmthValueSpan.textContent = '0%';
            grayscaleSlider.value = '0';
            grayscaleValueSpan.textContent = '0%';
            sharpenSlider.value = '0';
            sharpenValueSpan.textContent = '0%';
            shadowsSlider.value = '0';
            shadowsValueSpan.textContent = '0%';
            highlightsSlider.value = '0';
            highlightsValueSpan.textContent = '0%';
            claritySlider.value = '0';
            clarityValueSpan.textContent = '0%';
            // Removed: skinSmoothingSlider, skinWhiteningSlider, lipstickColorPicker values reset


            // Reset pattern selections
            topPatternSelector.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
            topPatternSelector.querySelector('img[data-pattern=""]').classList.add('selected');
            selectedTopPattern = '';

            bottomPatternSelector.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
            bottomPatternSelector.querySelector('img[data-pattern=""]').classList.add('selected');
            selectedBottomPattern = '';

            overlayPatternSelector.querySelectorAll('img').forEach(img => img.classList.remove('selected')); // New reset
            overlayPatternSelector.querySelector('img[data-pattern=""]').classList.add('selected');          // New reset
            selectedOverlayPattern = '';                                                                    // New reset
        }

        /**
         * Populates the pattern selectors using the patternList JSON data.
         */
        function populatePatternSelectors() {
            // Clear existing patterns
            topPatternSelector.innerHTML = '<span class="text-sm font-medium text-gray-700 w-full mb-1">Họa tiết trên:</span>';
            bottomPatternSelector.innerHTML = '<span class="text-sm font-medium text-gray-700 w-full mb-1">Họa tiết dưới:</span>';
            overlayPatternSelector.innerHTML = '<span class="text-sm font-medium text-gray-700 w-full mb-1">Họa tiết lớp phủ:</span>'; // New clear

            topPatternList.forEach(pattern => {
                const img = document.createElement('img');
                img.src = pattern.thumbnail;
                img.alt = pattern.name;
                img.dataset.pattern = pattern.src;
                img.classList.add('rounded-md', 'border-2', 'border-transparent');
                topPatternSelector.appendChild(img);
            });

            bottomPatternList.forEach(pattern => {
                const img = document.createElement('img');
                img.src = pattern.thumbnail;
                img.alt = pattern.name;
                img.dataset.pattern = pattern.src;
                img.classList.add('rounded-md', 'border-2', 'border-transparent');
                bottomPatternSelector.appendChild(img);
            });

            // New: Populate overlay patterns
            overlayPatternList.forEach(pattern => {
                const img = document.createElement('img');
                img.src = pattern.thumbnail;
                img.alt = pattern.name;
                img.dataset.pattern = pattern.src;
                img.classList.add('rounded-md', 'border-2', 'border-transparent');
                overlayPatternSelector.appendChild(img);
            });


            // Select "None" as default for all pattern types
            topPatternSelector.querySelector('img[data-pattern=""]').classList.add('selected');
            bottomPatternSelector.querySelector('img[data-pattern=""]').classList.add('selected');
            overlayPatternSelector.querySelector('img[data-pattern=""]').classList.add('selected'); // New default select
            selectedTopPattern = '';
            selectedBottomPattern = '';
            selectedOverlayPattern = ''; // New default value
        }


        // --- Event Listeners ---

        window.onload = () => {
            populatePatternSelectors(); // Populate patterns on load
            startCamera();
        };

        captureButton.addEventListener('click', capturePhoto);

        combineButton.addEventListener('click', async () => {
            if (capturedPhotos.length === selectedLayout) {
                switchStage(previewStage);
                // Initial combine with current decoration settings for final output
                await applyDecorations(); // Await this call to ensure drawing is complete
                stopCamera(); // Stop camera when moving to preview stage
            } else {
                showMessageBox(`Vui lòng chụp đủ ${selectedLayout} ảnh trước khi kết hợp.`);
            }
        });

        retakeButton.addEventListener('click', retakePhotos);
        saveButton.addEventListener('click', saveCombinedPhoto);
        printButton.addEventListener('click', printCombinedPhoto);

        layoutButtons.forEach(button => {
            button.addEventListener('click', () => {
                const layout = parseInt(button.dataset.layout, 10);
                if (layout !== selectedLayout) {
                    selectedLayout = layout;
                    // Reset captured photos if layout changes
                    capturedPhotos = [];
                    thumbnailsContainer.innerHTML = '';
                    updatePhotoCountDisplay();
                    updateLivePreview(); // Immediately update live preview with new layout
                    showMessageBox(`Bạn đã chọn bố cục ${selectedLayout} ảnh. Bắt đầu chụp!`);
                }
                // Highlight active layout button
                layoutButtons.forEach(btn => btn.classList.remove('bg-indigo-700', 'hover:bg-indigo-800'));
                button.classList.add('bg-indigo-700', 'hover:bg-indigo-800');
            });
        });

        // Initialize display for layout and photo count
        updatePhotoCountDisplay();
        layoutButtons[1].classList.add('bg-indigo-700', 'hover:bg-indigo-800'); // Highlight 4-photo default

        // Decoration & Filter Sliders update value display
        borderWidthSlider.addEventListener('input', () => {
            borderWidthValueSpan.textContent = `${borderWidthSlider.value}px`;
            updateLivePreview(); // Update live preview on border width change
        });
        imageGapSlider.addEventListener('input', () => { // New listener
            imageGapValueSpan.textContent = `${imageGapSlider.value}px`;
            updateLivePreview(); // Update live preview on gap change
        });
        fontSizeSlider.addEventListener('input', () => {
            fontSizeValueSpan.textContent = `${fontSizeSlider.value}px`;
            updateLivePreview(); // Update live preview on font size change
        });
        contrastSlider.addEventListener('input', () => {
            contrastValueSpan.textContent = `${contrastSlider.value}%`;
            applyFilters(); // Automatic filter application
        });
        brightnessSlider.addEventListener('input', () => {
            brightnessValueSpan.textContent = `${brightnessSlider.value}%`;
            applyFilters(); // Automatic filter application
        });
        saturationSlider.addEventListener('input', () => { // New listener
            saturationValueSpan.textContent = `${saturationSlider.value}%`;
            applyFilters();
        });
        warmthSlider.addEventListener('input', () => { // New listener
            warmthValueSpan.textContent = `${warmthSlider.value}%`;
            applyFilters();
        });
        grayscaleSlider.addEventListener('input', () => {
            grayscaleValueSpan.textContent = `${grayscaleSlider.value}%`;
            applyFilters(); // Automatic filter application
        });
        sharpenSlider.addEventListener('input', () => { // New listener
            sharpenValueSpan.textContent = `${sharpenSlider.value}%`;
            applyFilters(); // Note: limited functionality
        });
        shadowsSlider.addEventListener('input', () => { // New listener
            shadowsValueSpan.textContent = `${shadowsSlider.value}%`;
            applyFilters(); // Note: limited functionality
        });
        highlightsSlider.addEventListener('input', () => { // New listener
            highlightsValueSpan.textContent = `${highlightsSlider.value}%`;
            applyFilters(); // Note: limited functionality
        });
        claritySlider.addEventListener('input', () => { // New listener
            clarityValueSpan.textContent = `${claritySlider.value}%`;
            applyFilters(); // Note: limited functionality
        });
        // Removed skinSmoothingSlider, skinWhiteningSlider, lipstickColorPicker event listeners


        // New text option listeners
        topCaptionTextInput.addEventListener('input', updateLivePreview);
        bottomCaptionTextInput.addEventListener('input', updateLivePreview);
        fontFamilySelect.addEventListener('change', updateLivePreview);
        isBoldCheckbox.addEventListener('change', updateLivePreview);
        isItalicCheckbox.addEventListener('change', updateLivePreview);

        // Color and transparency listeners
        backgroundColorPicker.addEventListener('input', () => {
            if (syncColorsCheckbox.checked) {
                borderColorPicker.value = backgroundColorPicker.value;
            }
            updateLivePreview();
        });
        borderColorPicker.addEventListener('input', () => {
            transparentBorderColorCheckbox.checked = false; // Uncheck transparent if manual color selected
            updateLivePreview();
        });

        transparentBackgroundColorCheckbox.addEventListener('change', () => {
            if (transparentBackgroundColorCheckbox.checked) {
                // If background is transparent, uncheck sync colors as it might create conflicts
                syncColorsCheckbox.checked = false;
            }
            updateLivePreview();
        });
        
        transparentBorderColorCheckbox.addEventListener('change', () => {
             if (transparentBorderColorCheckbox.checked) {
                // If border is transparent, uncheck sync colors
                syncColorsCheckbox.checked = false;
            }
            updateLivePreview();
        });
        syncColorsCheckbox.addEventListener('change', () => {
            if (syncColorsCheckbox.checked) {
                borderColorPicker.value = backgroundColorPicker.value;
                // If sync is on, transparency should also sync, and direct transparency control should be off
                transparentBorderColorCheckbox.checked = transparentBackgroundColorCheckbox.checked;
                // transparentBackgroundColorCheckbox.checked = false; // Optionally disable direct transparency if syncing
            }
            updateLivePreview();
        });


        // Pattern selection listeners
        topPatternSelector.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                topPatternSelector.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
                event.target.classList.add('selected');
                selectedTopPattern = event.target.dataset.pattern;
                updateLivePreview(); // Update live preview immediately
            }
        });

        bottomPatternSelector.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                bottomPatternSelector.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
                event.target.classList.add('selected');
                selectedBottomPattern = event.target.dataset.pattern;
                updateLivePreview(); // Update live preview immediately
            }
        });

        // New: Overlay pattern selection listener
        overlayPatternSelector.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                overlayPatternSelector.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
                event.target.classList.add('selected');
                selectedOverlayPattern = event.target.dataset.pattern;
                updateLivePreview(); // Update live preview immediately
            }
        });


        // Apply Decorations button still exists for manual application of color, border, text, patterns.
        applyDecorationsButton.addEventListener('click', applyDecorations);

        messageBoxClose.addEventListener('click', hideMessageBox);
