package repositories

import (
	"fmt"
	"tour/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	FindTransactionByUser(ID int) ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
	// DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	// GetCategoryfilm(ID int) (models.Category, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Trip.Country").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) FindTransactionByUser(ID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Trip.Country").Preload("User").Find(&transactions, "user_id = ?", ID).Error
	fmt.Println(ID)
	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Trip.Country").Preload("User").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Trip").Preload("User").Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, orderId)

	if status != transaction.Status && status == "success" {
		var user models.User
		r.db.First(&user, transaction.UserID)
		user.Subcribe = true
		r.db.Save(&user)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}

// func (r *repository) UpdateTransaction(transaction models.Transaction, Id int) (models.Transaction, error) {
// 	err := r.db.Preload("Trip.Country").Model(&transaction).Updates(&transaction).Error
// 	// err := r.db.Exec("UPDATE transactions SET trip_id=? WHERE id=?", transaction.TripID, transaction.ID).Error

// 	return transaction, err
// }