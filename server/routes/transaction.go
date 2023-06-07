package routes

import (
	"tour/handlers"
	"tour/pkg/middleware"
	"tour/pkg/mysql"
	"tour/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/user/:id/transaction", h.FindTransactionByUser)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	// e.PATCH("/transaction/:id", middleware.UploadFile(h.UpdateTransaction))
	// e.DELETE("/trip/:id", h.DeleteTrip)
	e.POST("/notification", h.Notification)
}
