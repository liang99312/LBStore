/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class KeHuDao extends BaseDao {
    
    public boolean existKeHu(Integer qy_id, Integer id, String mc) {
        String sql = "";
        if (id > -1) {
            sql = "select 1 from kehu where qy_id=" + qy_id + " and id!=" + id + " and mc ='" + mc + "'";
        } else {
            sql = "select 1 from kehu where qy_id=" + qy_id + " and mc ='" + mc + "'";
        }
        List list = this.getSqlResult(sql);
        return !list.isEmpty();
    }
}
