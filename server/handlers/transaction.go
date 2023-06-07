package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	dto "tour/dto/result"
	transactiondto "tour/dto/transaction"
	"tour/models"
	"tour/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

// var path_file = "http://localhost:5000/uploads/"

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}
func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// for i, p := range transactions {
	// 	transactions[i].Attachment = path_file + p.Attachment
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}
func (h *handlerTransaction) FindTransactionByUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transactions, err := h.TransactionRepository.FindTransactionByUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}

func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// transaction.Attachment = path_file + transaction.Attachment

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}
func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(transactiondto.CreateTransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	// Startdate := time.Now()
	// EndDate := time.Now().Add(time.Hour * 24 * time.Duration(request.Days))

	// Create Unique Transaction Id ...
	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:         transactionId,
		Counterqty: request.Counterqty,
		UserID:     int(userId),
		TripID:     request.TripID,
		// StartDate: Startdate,
		// EndDate:   EndDate,
		Total:  request.Total,
		Status: "Pendding",
	}

	dataTransactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	// dataTransactions, err := h.TransactionRepository.GetTransaction(newTransactions.ID)
	// if err != nil {
	// 	return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	// }

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID),
			GrossAmt: int64(dataTransactions.Total),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransactions.User.Fullname,
			Email: dataTransactions.User.Email,
		},
	}

	//3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: snapResp})
}

// func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
// 	userLogin := c.Get("userLogin")
// 	userId := userLogin.(jwt.MapClaims)["id"].(float64)
// 	request := new(transactiondto.CreateTransactionRequest)
// 	if err := c.Bind(request); err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	validation := validator.New()
// 	err := validation.Struct(request)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	transaction := models.Transaction{
// 		Counterqty: request.Counterqty,
// 		Total:      request.Total,
// 		Status:     request.Status,
// 		TripID:     request.TripID,
// 		UserID:     int(userId),
// 		// UserID:     request.UserID,
// 		// Films: request.Film,
// 		// FilmID: request.FilmID,
// 		// Films: request.Films,
// 		// Email:    request.Email,
// 		// Password: request.Password,
// 	}

// 	data, err := h.TransactionRepository.CreateTransaction(transaction)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }

// func (h *handlerTransaction) UpdateTransaction(c echo.Context) error {
// 	request := new(transactiondto.UpdateTransactionRequest)
// 	if err := c.Bind(&request); err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	transaction, err := h.TransactionRepository.GetTransaction(id)

// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.Counterqty != 0 {
// 		transaction.Counterqty = request.Counterqty
// 	}
// 	if request.Total != 0 {
// 		transaction.Total = request.Total
// 	}
// 	if request.Status != "" {
// 		transaction.Status = request.Status
// 	}
// 	if request.TripID != 0 {
// 		transaction.TripID = request.TripID
// 	}
// 	// if request.UserID != 0 {
// 	// 	transaction.UserID = request.UserID
// 	// }

// 	data, err := h.TransactionRepository.UpdateTransaction(transaction, id)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }

// func (h *handlerTransaction) UpdateTransaction(c echo.Context) error {
// 	// request := new(tripdto.UpdateTripRequest)
// 	// if err := c.Bind(&request); err != nil {
// 	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	// }
// 	// get the datafile here
// 	dataFile := c.Get("dataFile").(string)
// 	fmt.Println("this is data file", dataFile)

// 	tripid, _ := strconv.Atoi(c.FormValue("tripid"))
// 	counterqty, _ := strconv.Atoi(c.FormValue("counterqty"))
// 	total, _ := strconv.Atoi(c.FormValue("total"))

// 	request := transactiondto.CreateTransactionRequest{
// 		Counterqty: counterqty,
// 		Total:      total,
// 		Status:     c.FormValue("status"),
// 		// Attachment: dataFile,
// 		TripID: tripid,
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	transaction, err := h.TransactionRepository.GetTransaction(id)

// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.Counterqty != 0 {
// 		transaction.Counterqty = request.Counterqty
// 	}
// 	if request.Total != 0 {
// 		transaction.Total = request.Total
// 	}
// 	if request.Status != "" {
// 		transaction.Status = request.Status
// 	}
// 	// if request.Attachment != "" {
// 	// 	transaction.Attachment = request.Attachment
// 	// }
// 	if request.TripID != 0 {
// 		transaction.TripID = request.TripID
// 	}
// 	// fmt.Println("", transaction)
// 	// if request.Trip != "" {
// 	// 	transaction.TripID = request.Trip
// 	// }

// 	data, err := h.TransactionRepository.UpdateTransaction(transaction, id)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)
	order_id, _ := strconv.Atoi(orderId)
	transaction, err := h.TransactionRepository.GetTransaction(order_id)
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Print("ini payloadnya", notificationPayload)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransaction("pending", order_id)
		} else if fraudStatus == "accept" {
			SendMail("success", transaction)
			// TODO set transaction status on your database to 'success'
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		SendMail("success", transaction)
		// TODO set transaction status on your databaase to 'success'
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "Dumbflix <demo.dumbflix@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var productName = "Subscription Dumbflix"
		var price = strconv.Itoa(transaction.Total)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Name : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, productName, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}

// func convertResponsetransaction(u models.Transaction) models.Transaction {
// 	return models.Transaction{
// 		ID:         u.ID,
// 		Counterqty: u.Counterqty,
// 		Total:      u.Total,
// 		Status:     u.Status,
// 		Attachment: u.Attachment,
// 		TripID:     u.TripID,
// 	}
// }