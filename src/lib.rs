mod utils;
use std::fmt;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum Cell {
    Start = 0,
    Goal = 1,
    Obstacle = 2,
}

#[wasm_bindgen]
pub struct World {
    width: u8,
    height: u8,
    cells: Vec<Cell>,
    f_score: [f32; 256],
    g_score: [f32; 256],
    came_from: [u32; 256],
    start_index: usize,
    goal_index: usize,
}

#[wasm_bindgen]
impl World {
    pub fn new() -> World {
        let width = 12;
        let height = 12;
        let cells: Vec<Cell> = (0..width * height)
            .map(|i| {
                if i == 9 {
                    Cell::Start
                } else {
                    if i == 14 {
                        Cell::Goal
                    } else {
                        Cell::Obstacle
                    }
                }
            })
            .collect();
        World {
            width: width,
            height: height,
            cells: cells,
            f_score: [1000.0; 256],
            g_score: [1000.0; 256],
            came_from: [0; 256],
            start_index: 9,
            goal_index: 14,
        }
    }

    pub fn find(&mut self) {}

    pub fn h(&self, index: usize) -> f32 {
        let mut x_diff: i8 = self.get_x(self.goal_index) - self.get_x(index);
        let mut y_diff: i8 = self.get_y(self.goal_index) - self.get_y(index);
        if x_diff < 0 {
            x_diff = x_diff * -1;
        }
        if y_diff < 0 {
            y_diff = y_diff * -1;
        }
        (x_diff + y_diff) as f32
    }

    pub fn get_x(&self, index: usize) -> i8 {
        index as i8 / self.height as i8
    }

    pub fn get_y(&self, index: usize) -> i8 {
        index as i8 % self.width as i8
    }
    pub fn get_index(&self, row: u8, column: u8) -> usize {
        (row * self.width + column) as usize
    }

    pub fn width(&self) -> u8 {
        self.width
    }

    pub fn height(&self) -> u8 {
        self.height
    }

    pub fn nodes(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for World {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Start { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}
