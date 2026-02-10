<div align="center">


<h1>ABot-M0: VLA Foundation Model for Robotic
Manipulation with Action Manifold Learnin</h1>


<p align="center">
  <a href="https://arxiv.org/abs/..."><img src="https://img.shields.io/static/v1?label=Paper&message=PDF&color=red&logo=arxiv"></a>
  <a href="https://...."><img src="https://img.shields.io/badge/Project-Website-blue"></a>
  <a href="https://huggingface.co/...."><img src="https://img.shields.io/static/v1?label=%F0%9F%A4%97%20Model&message=HuggingFace&color=orange"></a>
  <a href="https://modelscope.cn/...."><img src="https://img.shields.io/static/v1?label=%F0%9F%A4%96%20Model&message=ModelScope&color=purple"></a>
</p>

</div>



## 🌟 ABot-M0 is a general-purpose robotics model with the following core highlights:
<div style="text-align: center;">
  <img src="assets/model.jpg" alt="JanusVLN" width="888"/>
</div>

**Massive & Unified Data:** It integrates over 6 million open-source trajectories to form the largest unified dataset for robotic manipulation, providing a strong foundation for generalization.

**Innovative Action Paradigm:** It pioneers Action Manifold Learning (AML), which directly predicts clean actions instead of noise, resulting in a more efficient and stable model.

**Modular 3D Perception:** It supports plug-and-play modules to enhance 3D spatial understanding, improving execution precision for complex tasks.

## 📢 News
[2026-2-11] 🥳🥳**ABot-M0**'s [technical report](), [weights](), and [inference code]() have been released.🎉🎉



## Table of Contents
- [🛠️ Installation](#-Installation)
- [🏆 Model Zoo](#-Model-Zoo)
- [📈 Evaluation](#-Evaluation)
- [📜 Citing](#-Citing)
- [🙏 Acknowledgement](#-acknowledgement)

## 🛠️ Installation

Create the required environment through the following steps:



```bash
# Clone the repo
git clone https://github.com/amap-cvlab/ABot-Manipulation.git
cd ABot-Manipulation

# Create conda environment
conda create -n ABot python=3.10 -y
conda activate ABot

# Install requirements
pip install -r requirements.txt

# Install FlashAttention2
pip install flash-attn --no-build-isolation

# Install ABot
pip install -e .
```





## 🏆 Model Zoo

| Model Name | Huggingface Repository | ModelScope Repository  | Description |
| :--- | :--- | :--- | :--- |
| ABot-LIBERO &nbsp; | [🤗 .....](https://huggingface.co/) | [🤖 ....](https://modelscope.cn/)  | ABot trained solely on LIBERO for evaluation on LIBERO and zero-shot generalization to LIBERO-Plus. |
| ABot-RoboCasa-GR1-Tabletop   | [🤗 ....](https://huggingface.co/) | [🤖 ...](https://modelscope.cn/models/)  | ABot trained on RoboCasa-GR1-Tabletop for evaluation. |
| ABot-Robotwin2  | [🤗 ....](https://huggingface.co/) | [🤖 ...](https://modelscope.cn/models/)  | ABot trained on Robotwin2 Clean and randomized for evaluation.|
---




## 📈 Evaluation
Please refer to the guidance in the `examples` folder to evaluate the benchmarks.

---



## 📜 Citing

If you find **ABot** is useful in your research or applications, please consider giving us a **star** 🌟 and **citing** it by the following BibTeX entry:

```
...
```

---


## 🙏 Acknowledgement
This project builds upon [starVLA](https://github.com/starVLA/starVLA), [Qwen3-VL](https://github.com/QwenLM/Qwen3-VL), [LeRobot](https://github.com/huggingface/lerobot) and [Isaac-GR00T
](https://github.com/NVIDIA/Isaac-GR00T). We thank these teams for their open-source contributions.