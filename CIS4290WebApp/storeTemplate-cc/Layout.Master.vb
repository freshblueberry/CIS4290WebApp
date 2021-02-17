Imports System.Data
Imports System.Data.SqlClient

Public Class Layout
    Inherits System.Web.UI.MasterPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Session("Customer") <> "" Then
            hlLogin.Visible = False
            hlLogout.Visible = True
            lblCustomer.Text = Session("Customer")
            lblCustomer.Visible = True
        End If
        Dim strConn As String = System.Configuration.ConfigurationManager.ConnectionStrings("ConnectionStringOnlineStore").ConnectionString
        Dim connMainCategory As SqlConnection
        Dim cmdMainCategory As SqlCommand
        Dim drMainCategory As SqlDataReader
        Dim strSQL As String = "Select * from MainCategory Where parent = 0"
        connMainCategory = New SqlConnection(strConn)
        cmdMainCategory = New SqlCommand(strSQL, connMainCategory)
        connMainCategory.Open()
        drMainCategory = cmdMainCategory.ExecuteReader(CommandBehavior.CloseConnection)
        Dim strMainCategory As String = ""
        Do While drMainCategory.Read()
            strMainCategory = strMainCategory + "<li><a href=''>" + Trim(drMainCategory("CategoryName")) + "</a></li>"
        Loop
        lblMainCategory2.Text = strMainCategory
    End Sub

    Private Sub btnSearch_Click(sender As Object, e As EventArgs) Handles btnSearch.Click
        If tbSearch.Text <> "" Then
            Dim strURL As String

            Dim StrCheck As String = " "
            If Not Trim(tbSearch.Text).Contains(StrCheck) Then
                'check if projectId matches'
                Dim strSQL As String = "Select * from Product Where Product ID =  '" & tbSearch.Text & "'"

                'assing dynamic value for strURL (done)'
                'if there is a match, then redirect to ProductDetail.aspx'
                Response.Redirect("Single_Item.aspx?ProductID=" & tbSearch.Text)

            Else
                strURL = "Products.aspx?SearchString=" & Trim(tbSearch.Text)

                Response.Redirect(strURL)

            End If
        End If
    End Sub

End Class