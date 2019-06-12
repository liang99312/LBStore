/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class WuZiZiDianDao extends BaseDao {

    public boolean existWuZiZiDian(Integer qy_id, Integer id, String mc, String bm) {
        String sql = "";
        if (id > -1) {
            sql = "select 1 from wuzizidian where qy_id=" + qy_id + " and id!=" + id + " and (mc ='" + mc + "' or bm='" + bm + "')";
        } else {
            sql = "select 1 from wuzizidian where qy_id=" + qy_id + " and (mc ='" + mc + "' or bm='" + bm + "')";
        }
        List list = this.getSqlResult(sql);
        return !list.isEmpty();
    }
}
