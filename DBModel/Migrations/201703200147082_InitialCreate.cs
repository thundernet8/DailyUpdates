namespace DBModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Actions",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UID = c.Int(nullable: false),
                        FIELDID = c.Int(nullable: false),
                        DESTINATION = c.String(),
                        CREATE = c.DateTime(nullable: false),
                        UPDATE = c.DateTime(nullable: false),
                        UPDATEBY = c.Int(nullable: false),
                        TURNOVER = c.DateTime(nullable: false),
                        DETAIL = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Fields",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        PARENT = c.Int(nullable: false),
                        PROJECTID = c.Int(nullable: false),
                        NAME = c.String(),
                        DESTINATION = c.String(),
                        START = c.DateTime(nullable: false),
                        END = c.DateTime(nullable: false),
                        TURNOVER = c.DateTime(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                        TopField_Id = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Fields", t => t.TopField_Id)
                .Index(t => t.TopField_Id);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NAME = c.String(),
                        DESCRIPTION = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Records",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UID = c.Int(nullable: false),
                        FIELDID = c.Int(nullable: false),
                        DESTINATION = c.String(),
                        CREATE = c.DateTime(nullable: false),
                        UPDATE = c.DateTime(),
                        UPDATEBY = c.Int(),
                        DETAIL = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NAME = c.String(),
                        DOMAINNAME = c.String(),
                        ROLE = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Fields", "TopField_Id", "dbo.Fields");
            DropIndex("dbo.Fields", new[] { "TopField_Id" });
            DropTable("dbo.Users");
            DropTable("dbo.Records");
            DropTable("dbo.Projects");
            DropTable("dbo.Fields");
            DropTable("dbo.Actions");
        }
    }
}
