// --- Thiết lập Canvas ---
        const canvas = document.getElementById('particleHeartCanvas');
        const ctx = canvas.getContext('2d');

        let canvasWidth = window.innerWidth * 0.95;
        let canvasHeight = window.innerHeight * 0.95;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // --- CÁC THÔNG SỐ CẤU HÌNH ---
        const SETTINGS = {
            numParticles: 8000,        
            heartScaleFactor: 0.021,    
            
            baseLayerSize: canvasWidth * 0.75, 
            basePlaneCanvasY: canvasHeight * 0.94, 
            baseSwirlSpeed: 0.0012,     
            baseParticleAlpha: 0.65,    
            baseParticleSizeFactor: 0.75, 
            baseDissipationChance: 0.00008, 
            
            timeToMoveToHeartMin: 1000, 
            timeToMoveToHeartRandom: 3000, 

            toHeartSpeedMin: 0.0030,      
            toHeartSpeedMax: 0.0070,      
            toHeartDissipationChance: 0.00002, 
            targetHeartBottomBiasFactor: 0.20, 

            lifeInHeartMin: 3000,       
            lifeInHeartMax: 5500,       
            heartParticleAlpha: 1.0,    
            heartParticleSizeFactor: 1.10, 
            heartDepthFactor: 8.0,      
            edgeThicknessRatio: 0.03,   
            bulgeExponent: 1.4,         

            heartOrbitStrength: 0.0009,  
            heartOrbitRandomness: 0.015, 
            heartOrbitDamping: 0.95,      


            flashOutMagnitudeFactor: 1.4, 
            flashDurationMin: 1200,      
            flashDurationMax: 2000,     
            flashParticleSizeFactor: 1.5, 

            perspectiveFactor: 0.65,     
            projectionCenterYOffset: canvasHeight / 3.5, 
            rotationSpeedFactor: 0.0007, 
            rotationDamping: 0.93,      
            motionBlurAlpha: 0.92,  
            sparkleStrength: 0.6 
        };

        const ParticleState = {
            BASE: 0, TO_HEART: 1, IN_HEART: 2, OUTWARD: 3,
            DISSIPATING_BASE: 4, DISSIPATING_TO_HEART: 5
        };

        const particles = [];
        let heartScale = Math.min(canvasWidth, canvasHeight) * SETTINGS.heartScaleFactor;
        const perspective = canvasWidth * SETTINGS.perspectiveFactor;
        const projectionCenterX = canvasWidth / 2;
        const projectionCenterY = SETTINGS.projectionCenterYOffset;

        let targetRotationX = 0.15;
        let targetRotationY = 0;
        let currentRotationX = 0.15;
        let currentRotationY = 0;
        
        class Particle {
            constructor() {
                this.resetToBase();
                this.sparkleBrightness = 1.0; 
                this.vxHeart = 0; this.vyHeart = 0; this.vzHeart = 0;
            }

            setHeartTarget() {
                let t, x, y, z, attempts = 0;
                const maxAttempts = 30; 
                const maxHalfDepth = heartScale * SETTINGS.heartDepthFactor * 0.5;

                do {
                    t = Math.random() * 2 * Math.PI; 
                    
                    if (SETTINGS.targetHeartBottomBiasFactor > 0 && Math.random() < SETTINGS.targetHeartBottomBiasFactor) { 
                        const baseT = Math.PI; 
                        const range = Math.PI; 
                        t = baseT + (Math.random() - 0.5) * range;
                    }

                    let surfaceX = heartScale * 16 * Math.pow(Math.sin(t), 3);
                    let surfaceY = -heartScale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); 
                    
                    let r = Math.cbrt(Math.random()); 
                    
                    x = surfaceX * r;
                    y = surfaceY * r;
                    
                    let bulgeFactor = 1 - Math.pow(r, SETTINGS.bulgeExponent); 
                    let currentMaxZForThisParticle = maxHalfDepth * (SETTINGS.edgeThicknessRatio + (1 - SETTINGS.edgeThicknessRatio) * bulgeFactor);
                    z = (Math.random() * 2 - 1) * currentMaxZForThisParticle;
                    
                    attempts++;
                } while ((isNaN(x) || isNaN(y)) && attempts < maxAttempts);
                
                this.targetHeartX = x;
                this.targetHeartY = y; 
                this.targetHeartZ = z;
            }

            resetToBase() {
                this.state = ParticleState.BASE;
                this.setHeartTarget(); 

                this.x = (Math.random() - 0.5) * SETTINGS.baseLayerSize;
                this.z = (Math.random() - 0.5) * (SETTINGS.baseLayerSize * 0.02); 


                this.y = (SETTINGS.basePlaneCanvasY - projectionCenterY) + (Math.random() - 0.5) * 30; 
                
                this.alpha = SETTINGS.baseParticleAlpha * (0.75 + Math.random() * 0.25);
                this.baseColorHue = 180 + Math.random() * 60; 
                this.heartColorHue = 330 + Math.random() * 30;
                this.color = `hsla(${this.baseColorHue}, 100%, ${60 + Math.random() * 20}%, ${this.alpha})`;

                this.size = (1 + Math.random() * 0.5) * SETTINGS.baseParticleSizeFactor;
                this.timeToMoveToHeart = SETTINGS.timeToMoveToHeartMin + Math.random() * SETTINGS.timeToMoveToHeartRandom; 
                this.movementProgress = 0;
                this.dissipationProgress = 0;
                
                this.vxHeart = (Math.random() - 0.5) * 0.05; 
                this.vyHeart = (Math.random() - 0.5) * 0.05;
                this.vzHeart = (Math.random() - 0.5) * 0.05;

                this.baseSwirlAngle = Math.random() * Math.PI * 2;
                this.baseSwirlRadius = Math.min(SETTINGS.baseLayerSize / 2, Math.sqrt(this.x * this.x + this.z * this.z)) * (0.85 + Math.random() * 0.15);
            }
            
            startDissipating(fromState) {
                if (fromState === ParticleState.BASE) this.state = ParticleState.DISSIPATING_BASE;
                else if (fromState === ParticleState.TO_HEART) this.state = ParticleState.DISSIPATING_TO_HEART;
                this.dissipationProgress = 0;
            }

            update(deltaTime, currentTime) { 
                switch (this.state) {
                    case ParticleState.BASE:
                        this.timeToMoveToHeart -= deltaTime;
                        
                        this.baseSwirlAngle += SETTINGS.baseSwirlSpeed * (this.x > 0 ? 1.01 : -0.99); 
                        const currentRadius = this.baseSwirlRadius * (0.92 + Math.sin(this.baseSwirlAngle * 0.75 + this.x *0.01) * 0.08); 
                        this.x = currentRadius * Math.cos(this.baseSwirlAngle);
                        this.y = (SETTINGS.basePlaneCanvasY - projectionCenterY) + Math.sin(this.baseSwirlAngle * 2.8 + this.x * 0.045) * 8;


                        this.alpha = Math.min(SETTINGS.baseParticleAlpha, this.alpha + 0.009);

                        if (this.timeToMoveToHeart <= 0) {
                            this.state = ParticleState.TO_HEART;
                            this.startX = this.x; this.startY = this.y; this.startZ = this.z; 
                            this.startAlpha = this.alpha;
                            this.movementProgress = 0;
                            this.currentToHeartSpeed = SETTINGS.toHeartSpeedMin + Math.random() * (SETTINGS.toHeartSpeedMax - SETTINGS.toHeartSpeedMin);
                        } else if (Math.random() < SETTINGS.baseDissipationChance) { 
                             this.startDissipating(ParticleState.BASE);
                        }
                        this.color = `hsla(${this.baseColorHue}, 100%, ${65 + Math.random() * 15}%, ${this.alpha})`;
                        break;

                    case ParticleState.TO_HEART:
                        this.movementProgress += this.currentToHeartSpeed;
                        
                        if (Math.random() < SETTINGS.toHeartDissipationChance && this.movementProgress < 0.95) { 
                           this.startDissipating(ParticleState.TO_HEART);
                        }

                        if (this.movementProgress >= 1) {
                            this.movementProgress = 1;
                            this.state = ParticleState.IN_HEART;
                            this.x = this.targetHeartX; 
                            this.y = this.targetHeartY; 
                            this.z = this.targetHeartZ;
                            this.vxHeart = (Math.random() - 0.5) * 0.02; 
                            this.vyHeart = (Math.random() - 0.5) * 0.02;
                            this.vzHeart = (Math.random() - 0.5) * 0.02;
                            this.lifeInHeart = SETTINGS.lifeInHeartMin + Math.random() * (SETTINGS.lifeInHeartMax - SETTINGS.lifeInHeartMin);
                            this.alpha = SETTINGS.heartParticleAlpha; 
                        } else {
                            const easeProgress = 1 - Math.pow(1 - this.movementProgress, 3); 
                            this.x = this.startX + (this.targetHeartX - this.startX) * easeProgress;
                            this.y = this.startY + (this.targetHeartY - this.startY) * easeProgress;
                            this.z = this.startZ + (this.targetHeartZ - this.startZ) * easeProgress; 
                            this.alpha = this.startAlpha + (SETTINGS.heartParticleAlpha - this.startAlpha) * easeProgress;
                        }
                        const currentHue = this.baseColorHue + (this.heartColorHue - this.baseColorHue) * this.movementProgress;
                        this.color = `hsla(${currentHue}, 100%, ${70 + 20 * this.movementProgress}%, ${this.alpha})`; 
                        break;

                    case ParticleState.IN_HEART:
                        this.lifeInHeart -= deltaTime;
                        
                        this.vxHeart += (Math.random() - 0.5) * SETTINGS.heartOrbitRandomness;
                        this.vyHeart += (Math.random() - 0.5) * SETTINGS.heartOrbitRandomness;
                        this.vzHeart += (Math.random() - 0.5) * SETTINGS.heartOrbitRandomness * 0.5; 

                        this.vxHeart += (this.targetHeartX - this.x) * SETTINGS.heartOrbitStrength;
                        this.vyHeart += (this.targetHeartY - this.y) * SETTINGS.heartOrbitStrength;
                        this.vzHeart += (this.targetHeartZ - this.z) * SETTINGS.heartOrbitStrength;

                        this.vxHeart *= SETTINGS.heartOrbitDamping;
                        this.vyHeart *= SETTINGS.heartOrbitDamping;
                        this.vzHeart *= SETTINGS.heartOrbitDamping;

                        this.x += this.vxHeart;
                        this.y += this.vyHeart;
                        this.z += this.vzHeart;
                        
                        this.alpha = SETTINGS.heartParticleAlpha; 
                        if (this.lifeInHeart <= 0) {
                            this.state = ParticleState.OUTWARD;
                            const magnitude = heartScale * SETTINGS.flashOutMagnitudeFactor * (0.95 + Math.random() * 0.25);
                            this.flashOutDirectionX = (Math.random() - 0.5) * 2.8 * magnitude; 
                            this.flashOutDirectionY = (Math.random() - 0.5) * 2.8 * magnitude;
                            this.flashOutDirectionZ = (Math.random() - 0.5) * 2.2 * magnitude; 
                            this.flashDuration = SETTINGS.flashDurationMin + Math.random() * (SETTINGS.flashDurationMax - SETTINGS.flashDurationMin);
                            this.initialFlashX = this.x; this.initialFlashY = this.y; this.initialFlashZ = this.z;
                            this.flashProgress = 0;
                        }
                        this.color = `hsla(${this.heartColorHue}, 100%, 80%, ${this.alpha})`;
                        break;

                    case ParticleState.OUTWARD:
                        this.flashProgress += deltaTime / this.flashDuration;
                        if (this.flashProgress >= 1) {
                            this.resetToBase(); 
                        } else {
                            const easeFlashProgress = Math.sin(this.flashProgress * Math.PI / 2); 
                            this.x = this.initialFlashX + this.flashOutDirectionX * easeFlashProgress;
                            this.y = this.initialFlashY + this.flashOutDirectionY * easeFlashProgress;
                            this.z = this.initialFlashZ + this.flashOutDirectionZ * easeFlashProgress;
                            this.alpha = Math.max(0, SETTINGS.heartParticleAlpha * (1 - this.flashProgress * 1.25)); 
                            this.color = `hsla(${this.heartColorHue}, 100%, ${90 + 8 * this.flashProgress}%, ${this.alpha})`; 
                        }
                        break;
                    
                    case ParticleState.DISSIPATING_BASE:
                    case ParticleState.DISSIPATING_TO_HEART:
                        this.dissipationProgress += (this.state === ParticleState.DISSIPATING_BASE ? 0.025 : 0.035);
                        this.alpha = (this.state === ParticleState.DISSIPATING_BASE ? SETTINGS.baseParticleAlpha : this.startAlpha) * (1 - this.dissipationProgress);
                        if (this.state === ParticleState.DISSIPATING_BASE) {
                            this.y -= 0.15; 
                        } else { 
                            this.x += (Math.random() - 0.5) * 0.2;
                            this.y += (Math.random() - 0.5) * 0.2;
                        }
                        if (this.dissipationProgress >= 1 || this.alpha <=0.002) {
                            this.resetToBase();
                        }
                        this.color = this.color.replace(/hsla\(([^,]+),([^,]+),([^,]+),[^)]+\)/, `hsla($1,$2,$3,${Math.max(0,this.alpha)})`);
                        break;
                }

                if (this.state === ParticleState.BASE || this.state === ParticleState.IN_HEART) {
                     this.sparkleBrightness = 1.0 + (Math.sin(currentTime * 0.0065 + this.x * 0.13 + this.y * 0.07 + this.z * 0.05) * 0.5 + 0.5) * SETTINGS.sparkleStrength; 
                } else {
                    this.sparkleBrightness = 1.0;
                }

                let sizeFactor = (this.z + heartScale * SETTINGS.heartDepthFactor * 0.5) / (heartScale * SETTINGS.heartDepthFactor); 
                this.size = Math.max(0.5, sizeFactor * 2.3 + 0.5); 


                if (this.state === ParticleState.BASE || this.state === ParticleState.DISSIPATING_BASE) {
                    this.size *= SETTINGS.baseParticleSizeFactor * (0.93 + Math.sin(this.baseSwirlAngle*6.0)*0.07); 
                } else if (this.state === ParticleState.IN_HEART) {
                    this.size *= SETTINGS.heartParticleSizeFactor;
                } else if (this.state === ParticleState.OUTWARD) {
                    this.size *= SETTINGS.flashParticleSizeFactor * (1 + this.flashProgress * 0.5);
                } else if (this.state === ParticleState.TO_HEART || this.state === ParticleState.DISSIPATING_TO_HEART) {
                    this.size *= (SETTINGS.baseParticleSizeFactor + (SETTINGS.heartParticleSizeFactor - SETTINGS.baseParticleSizeFactor) * this.movementProgress);
                }
            }

            project() {
                let x_proj = this.x, y_proj = this.y, z_proj = this.z;

                if (this.state === ParticleState.IN_HEART || 
                   (this.state === ParticleState.TO_HEART && this.movementProgress > 0.1) || 
                    this.state === ParticleState.OUTWARD  ) {
                    const rotX = currentRotationX, rotY = currentRotationY;
                    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
                    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

                    const tempX = x_proj * cosY - z_proj * sinY;
                    const tempZ = z_proj * cosY + x_proj * sinY;
                    x_proj = tempX; z_proj = tempZ;

                    const tempY = y_proj * cosX - z_proj * sinX;
                    z_proj = z_proj * cosX + y_proj * sinX;
                    y_proj = tempY;
                }
                
                if (this.state === ParticleState.BASE || this.state === ParticleState.DISSIPATING_BASE) {
                     z_proj = this.z; 
                }


                const scaleProjected = perspective / (perspective + z_proj + heartScale * 2.5); 
                const finalX = (x_proj * scaleProjected) + projectionCenterX;
                const finalY = (y_proj * scaleProjected) + projectionCenterY;

                return { x: finalX, y: finalY, scale: Math.max(0.005, scaleProjected), alpha: this.alpha }; 
            }

            draw() {
                const proj = this.project();
                const baseRadius = this.size * proj.scale;
                let finalRadius = baseRadius;
                let L_multiplier = 1.0;

                if (this.state === ParticleState.IN_HEART || this.state === ParticleState.BASE) {
                    finalRadius = baseRadius * (1.0 + (this.sparkleBrightness - 1.0) * 0.4); 
                    L_multiplier = this.sparkleBrightness;
                }
                finalRadius = Math.max(0.05, finalRadius); 

                 if (proj.x < -finalRadius || proj.x > canvasWidth + finalRadius || 
                    proj.y < -finalRadius || proj.y > canvasHeight + finalRadius || 
                    proj.alpha <= 0.002 || proj.scale <= 0.002) return; 

                ctx.beginPath();
                const alphaToDraw = Math.max(0, Math.min(1, proj.alpha));
                try {
                    let baseColorParts = this.color.match(/hsla\((\d+\.?\d*),\s*(\d+%?),?\s*(\d+%?),?/); 
                    if (baseColorParts) {
                        let H = parseFloat(baseColorParts[1]);
                        let S = baseColorParts[2]; 
                        let L_val_str = baseColorParts[3];
                        let L = parseFloat(L_val_str);
                        
                        L = Math.min(100, Math.max(3, L * L_multiplier)); 
                        ctx.fillStyle = `hsla(${H},${S},${L}%,${alphaToDraw})`;
                    } else {
                         ctx.fillStyle = `hsla(0, 100%, 100%, ${alphaToDraw})`; 
                    }
                } catch (e) {
                     ctx.fillStyle = `hsla(0, 100%, 100%, ${alphaToDraw})`; 
                }
                
                ctx.arc(proj.x, proj.y, finalRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < SETTINGS.numParticles; i++) {
                particles.push(new Particle());
            }
        }

        let lastTime = 0;
        function animate(currentTime) {
            const deltaTime = Math.min(33, currentTime - lastTime); 
            lastTime = currentTime;

            ctx.fillStyle = `rgba(0, 0, 0, ${SETTINGS.motionBlurAlpha})`; 
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            currentRotationX += (targetRotationX - currentRotationX) * SETTINGS.rotationDamping * 0.1; 
            currentRotationY += (targetRotationY - currentRotationY) * SETTINGS.rotationDamping * 0.1; 


            particles.forEach(particle => {
                particle.update(deltaTime || 16.67, currentTime); 
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        function onResize() {
            canvasWidth = window.innerWidth * 0.95;
            canvasHeight = window.innerHeight * 0.95;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            
            SETTINGS.baseLayerSize = canvasWidth * 0.75;
            SETTINGS.projectionCenterYOffset = canvasHeight / 3.5; 
            SETTINGS.basePlaneCanvasY = canvasHeight * 0.94;

            heartScale = Math.min(canvasWidth, canvasHeight) * SETTINGS.heartScaleFactor;
        }
        window.addEventListener('resize', onResize);

        let isInteracting = false;
        let lastPointerX = 0, lastPointerY = 0;

        function startInteraction(x, y) { isInteracting = true; lastPointerX = x; lastPointerY = y; }
        function moveInteraction(x, y) {
            if (!isInteracting) return;
            const dx = x - lastPointerX; const dy = y - lastPointerY;
            
            // Đảo ngược chiều xoay cho cảm giác tương tác trực tiếp
            targetRotationY += dx * SETTINGS.rotationSpeedFactor; 
            targetRotationX += dy * SETTINGS.rotationSpeedFactor; 

            lastPointerX = x; lastPointerY = y;
        }
        function endInteraction() { isInteracting = false; }

        canvas.addEventListener('mousedown', (e) => startInteraction(e.clientX, e.clientY));
        canvas.addEventListener('mousemove', (e) => moveInteraction(e.clientX, e.clientY));
        canvas.addEventListener('mouseup', endInteraction);
        canvas.addEventListener('mouseleave', endInteraction);
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startInteraction(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); moveInteraction(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        canvas.addEventListener('touchend', endInteraction);
        canvas.addEventListener('touchcancel', endInteraction);

        initParticles();
        animate(0);
