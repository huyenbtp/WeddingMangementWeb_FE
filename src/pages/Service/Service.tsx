import { useState } from 'react';
import { serviceList, Service as ServiceType } from './serviceData';
import './Service.css';

export default function Service() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const categories = ['Tất cả', 'Trang Trí', 'MC & Ca Sĩ', 'Quay Chụp', 'Làm Đẹp', 'Trang Phục', 'Phương Tiện', 'Thiệp & Quà', 'Bánh & Rượu', 'An Ninh'];

    const filteredServices = selectedCategory === 'Tất cả' 
        ? serviceList 
        : serviceList.filter(service => service.category === selectedCategory);

    return (
        <div className="service-container">
            <h2>Dịch Vụ Đám Cưới</h2>
            
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

            <div className="service-grid">
                {filteredServices.map((service: ServiceType) => (
                    <div key={service.id} className="service-card">
                        <img src={service.image} alt={service.name} className="service-image" />
                        <div className="service-info">
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <p className="service-price">{service.price.toLocaleString('vi-VN')} VNĐ</p>
                            <button className="select-btn">Chọn dịch vụ</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
