<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script src="Scripts/kindeditor/kindeditor-all.js"></script>
    <script type="text/javascript">

        $(function () {

            KindEditor.ready(function(K) {
                K.create('#content', {
                    uploadJson: "kindeditorHandler.ashx",
                    afterBlur: function () {
                        this.sync();

                      //  alert($('#content').val());
                       
                    }
            });
                
        });

        });
    </script>
    <div class="jumbotron">
       
        <textarea name="Content" id="content" style="height:500px;"></textarea>

        <input type="submit" value="提交" />
    </div>
</asp:Content>
