from PIL import Image

def process():
    try:
        # Load the original image
        logo = Image.open('GIOLIT_logo_upscaled_4x.png').convert("RGBA")
        
        # Save original color uncropped logo
        logo.save('devportal/frontend/public/logo-color.png')
        
        # Generate dark mode logo (white on transparent)
        r, g, b, a = logo.split()
        white = Image.new('L', logo.size, 255)
        logo_white = Image.merge('RGBA', (white, white, white, a))
        logo_white.save('devportal/frontend/public/logo-dark.png')
        
        # Generate light mode logo (black on transparent)
        black = Image.new('L', logo.size, 0)
        logo_black = Image.merge('RGBA', (black, black, black, a))
        logo_black.save('devportal/frontend/public/logo-light.png')
        
        # Generate favicon (square crop of the left part for a standard square favicon)
        width, height = logo.size
        min_dim = min(width, height)
        favicon_crop = logo.crop((0, 0, min_dim, min_dim))
        favicon = favicon_crop.resize((32, 32), Image.Resampling.LANCZOS)
        favicon.save('devportal/frontend/public/favicon.png')
        
        print("Logo processed successfully without cropping the main assets.")
    except Exception as e:
        print("Error:", e)

process()
