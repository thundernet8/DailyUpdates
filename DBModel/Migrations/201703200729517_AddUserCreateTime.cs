namespace DBModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserCreateTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "CREATE", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "CREATE");
        }
    }
}
