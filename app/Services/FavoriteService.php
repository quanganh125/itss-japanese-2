<?php
namespace App\Services;

use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
class FavoriteService
{
    public function get($id)
    {
        $favorite = Favorite::find($id);
        return $favorite;
    }

    public function getAll()
    {
        return Favorite::all();
    }

    public function getAllOfUser()
    {
        $user_id = Auth::user()->id;
        $favorites = Favorite::where("user_id", "=", $user_id)->get();
        return $favorites;
    }

    public function update($id, array $favorite_data)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->fill($favorite_data)->save();
        return $favorite;
    }

    public function delete($id)
    {
        $favorite = Favorite::destroy($id);
        return response()->json($id);
    }

    //Kiểm tra sản phẩm đã like chưa, nếu rồi thì không cho like lại
    public function checkProductLiked ($product_id){
        return true;
    }

}
