<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $slug = $this->route('slug');

        $user = User::where('slug', $slug)->first();

        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($user?->id),
            ],
            'phone'  => ['nullable', 'string', 'phone:PH', 'max:20'],
            'role' => [
                'required',
                Rule::enum(UserRole::class),
            ],

            'password' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'string',
                Password::min(8)->mixedCase()->numbers()->symbols(),
                'confirmed',
            ],
            'avatar' => ['nullable', 'image', 'max:25000'],
        ];
    }

    public function messages(): array
    {
        return [
            // Custom phone validation message
            'phone.phone' => 'The provided number is not a valid contact format for the Philippines.',
            'phone.max'   => 'The contact number must not exceed 20 characters.',
            // Custom image validation message
            'avatar.image' => 'The profile picture must be a valid image file (jpeg, png, bmp, gif, or svg).',
            'avatar.max'   => 'The image size is too large. Please upload an avatar smaller than 25MB.',
        ];
    }
}
