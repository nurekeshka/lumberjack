use std::{fs::File, io::{BufRead, BufReader}};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn something(path: &str) -> String {
    let res = File::open(path);

    if res.is_err() {
        wasm_bindgen::throw_str("Something went wrong from rust");
    }

    let reader = BufReader::new(res.unwrap());
    
    for line in reader.lines().flatten() {
        println!("{}", line);
    }

    todo!()
}
