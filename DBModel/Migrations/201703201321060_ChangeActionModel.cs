namespace DBModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeActionModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Actions", "PROJECTID", c => c.Int(nullable: false));
            AddColumn("dbo.Actions", "PARTIES", c => c.String(maxLength: 100));
            AddColumn("dbo.Actions", "DESCRIPTION", c => c.String());
            AddColumn("dbo.Actions", "PRIORITY", c => c.Int(nullable: false));
            AddColumn("dbo.Actions", "STATUS", c => c.Int(nullable: false));
            AddColumn("dbo.Actions", "COMMENT", c => c.String());
            AlterColumn("dbo.Actions", "UPDATE", c => c.DateTime());
            DropColumn("dbo.Actions", "FIELDID");
            DropColumn("dbo.Actions", "DESTINATION");
            DropColumn("dbo.Actions", "UPDATEBY");
            DropColumn("dbo.Actions", "TURNOVER");
            DropColumn("dbo.Actions", "DETAIL");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Actions", "DETAIL", c => c.String());
            AddColumn("dbo.Actions", "TURNOVER", c => c.DateTime(nullable: false));
            AddColumn("dbo.Actions", "UPDATEBY", c => c.Int(nullable: false));
            AddColumn("dbo.Actions", "DESTINATION", c => c.String());
            AddColumn("dbo.Actions", "FIELDID", c => c.Int(nullable: false));
            AlterColumn("dbo.Actions", "UPDATE", c => c.DateTime(nullable: false));
            DropColumn("dbo.Actions", "COMMENT");
            DropColumn("dbo.Actions", "STATUS");
            DropColumn("dbo.Actions", "PRIORITY");
            DropColumn("dbo.Actions", "DESCRIPTION");
            DropColumn("dbo.Actions", "PARTIES");
            DropColumn("dbo.Actions", "PROJECTID");
        }
    }
}
