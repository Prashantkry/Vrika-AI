import base64
import io
import torch

from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
from typing import Optional
from pydantic import BaseModel

# Specify the model to be loaded
model_id = 'stabilityai/stable-diffusion-2-1'

# Load the pipeline from the pre-trained model
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)

# Optimize for speed and efficiency by using a multistep scheduler
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

# Move model and computations to GPU for faster processing
pipe = pipe.to('cuda')

# class Item(BaseModel):
# 	prompt: str
# 	num_inference_steps: Optional[int] = 50
#     width: Optional[int]=2000
#     height: Optional[int]
#     seed: Optional[int]
#     negative_prompt: Optional[str]
#     num_outputs: Optional[int] 
#     guidance_scale: Optional[float]
#     scheduler: Optional[str]
#     refine_steps: Optional[int]
#     refine: Optional[str] 
#     sizing_strategy: Optional[str] 
#     num_inference_steps: Optional[int] = 1

class Item(BaseModel):
    prompt: str
    num_inference_steps: Optional[int] = 20
    height: Optional[int] = 512
    width: Optional[int] = 512
    guidance_scale: Optional[float] = 7.5
    negative_prompt: Optional[str] = None
    num_images_per_prompt: Optional[int] = 1
    seed: Optional[int] = 1

def predict(item):
    item = Item(**item)

    generator = torch.manual_seed(item.seed) if item.seed else None

    images = pipe(
        prompt=item.prompt,
        num_inference_steps=item.num_inference_steps,
        width=item.width,
        height=item.height,
        negative_prompt=item.negative_prompt,
        num_images_per_prompt=item.num_images_per_prompt,
        guidance_scale=item.guidance_scale,
        generator=generator
        
    ).images
    
    image_array = []
    
    buffered = io.BytesIO()
    for img in images: 
        
        img.save(buffered, format='PNG')
        finished_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
        image_array.append(finished_image)    
        
    return image_array


'''
From the stable diffusion docs tell me 
what the following parameters do:
prompt -> str: The prompt to condition the generation on.
num_inference_steps -> int: The number of inference steps to take. (default: 50)
image -> torch.Tensor: The image to condition the generation on. (default: None) -> for image data
strength -> float: The strength of the diffusion process. (default: 0.99) -> deg for changing the image data , range -> 0-1
guidance_scale -> float: The scale of the guidance loss. (default: 0.0) -> prompt weight 
negative_prompt -> str: The negative prompt to condition the generation on. (default: None) -> for image data
num_images_per_prompt -> no of image o/p 
callback_on_step_end -> Callable: A callback to run at the end of each inference step. (default: None)
'''