CREATE TABLE `contact_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`interest` text NOT NULL,
	`subject` text DEFAULT '' NOT NULL,
	`preference` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_contact_messages_email_created` ON `contact_messages` (`email`,`created_at`);