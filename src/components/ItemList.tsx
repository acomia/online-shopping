import React, { useState } from 'react';
import { Item } from '../types';
import SearchBar from './SearchBar';

interface ItemListProps {
    products: Item[];
    onAddToCart: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ products, onAddToCart }) => {
    const [items, setItems] = useState<Item[]>(products)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'highToLow' | 'lowToHigh'>('highToLow');

    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSortPrice = () => {
        const newSortOrder = sortOrder === 'highToLow' ? 'lowToHigh' : 'highToLow';
        setSortOrder(newSortOrder);

        const sortedItems = [...items].sort((a, b) => {
            if (newSortOrder === 'highToLow') {
                return b.unitPrice - a.unitPrice;
            } else {
                return a.unitPrice - b.unitPrice;
            }
        });

        setItems(sortedItems);
    };

    const filteredItems = items.filter(
        item =>
            (selectedCategory === null || item.category === selectedCategory) &&
            (searchQuery === '' || item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="item-list">
            <div className="category-sidebar">
                <ul>
                    <li className={selectedCategory === null ? 'selected' : ''} onClick={() => handleCategorySelect(null)}>All</li>
                    {Array.from(new Set(items.map(item => item.category))).map(category => (
                        <li key={category} onClick={() => handleCategorySelect(category)} className={selectedCategory === category ? 'selected' : ''}>
                            {category.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="items">
                <SearchBar onSearch={handleSearch} />
                <div className="sort-button">
                    <button onClick={handleSortPrice}>Sort Price {sortOrder === 'highToLow' ? 'High to Low' : 'Low to High'}</button>
                </div>
                {filteredItems.map(item => (
                    <div key={item.id} className="item-container">
                        {/* Render item details */}
                        <div className='img-with-description'>
                            <img src={`${item.imageUrl}`} alt={item.productName} />
                            <div className='item-details'>
                                <h3>{item.productName}</h3>
                                <p>{item.category.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <div className='add-to-cart'>
                            <p className='price'>₱{item.unitPrice}</p>
                            <button onClick={() => onAddToCart(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
