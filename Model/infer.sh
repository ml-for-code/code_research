#!/bin/bash

python -m nmt.nmt \
    --out_dir=./data/nmt_model \
    --inference_input_file=./data/code_infer.buggy \
    --inference_output_file=./data/code_infer.correct
