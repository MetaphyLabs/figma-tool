from PIL import Image, ImageOps
import os

def resize_image(input_path, output_path, size=(256, 256)):
    img = Image.open(input_path)
    # Maintain aspect ratio and add padding
    img.thumbnail(size, Image.Resampling.LANCZOS)  # Use LANCZOS for high-quality downscaling
    
    if img.mode == "RGBA":  # Preserve transparency for PNGs
        new_img = Image.new("RGBA", size, (255, 255, 255, 0))  # Transparent background
    else:
        new_img = Image.new("RGB", size, (255, 255, 255))  # White background for non-transparent images

    # Paste the resized image onto the center of the new image
    new_img.paste(img, ((size[0] - img.size[0]) // 2, (size[1] - img.size[1]) // 2), img if img.mode == "RGBA" else None)
    new_img.save(output_path)

input_dir = './public'
output_dir = './output'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for img_file in os.listdir(input_dir):
    if img_file.endswith(('.png', '.jpg', '.jpeg')):
        input_path = os.path.join(input_dir, img_file)
        output_path = os.path.join(output_dir, img_file)
        resize_image(input_path, output_path)
