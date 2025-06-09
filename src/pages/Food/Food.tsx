import { useState } from 'react';
import { foodList, Food as FoodType } from './foodData';
import './Food.css';

export default function Food() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Súp', 'Món Xào', 'Món Cơm', 'Món Ăn Kèm'];

    const filteredFoods = selectedCategory === 'Tất cả' 
        ? foodList 
        : foodList.filter(food => food.category === selectedCategory);

    return (
        <div className="food-container">
            <h2>Danh Sách Món Ăn</h2>
            
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="food-grid">
                {filteredFoods.map((food: FoodType) => (
                    <div key={food.id} className="food-card">
                        <img src={food.image} alt={food.name} className="food-image" />
                        <div className="food-info">
                            <h3>{food.name}</h3>
                            <p>{food.description}</p>
                            <p className="food-price">{food.price.toLocaleString('vi-VN')} VNĐ</p>
                            <button className="select-btn">Chọn món</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
