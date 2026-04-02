<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn(['flag_emoji', 'stay_type']);
        });
    }

    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('flag_emoji', 10)->nullable()->after('country');
            $table->string('stay_type', 100)->nullable()->after('content');
        });
    }
};
