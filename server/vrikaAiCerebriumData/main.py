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

class Item(BaseModel):
	prompt: str
	num_inference_steps: Optional[int] = 50
 
def predict(item, run_id, logger):
    item = Item(**item)

    image = pipe(item.prompt).images[0]
    buffered = io.BytesIO()
    image.save(buffered, format='PNG')
    finished_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return finished_image